const express = require('express');
const mongoose = require('mongoose');
const {HfInference} = require("@huggingface/inference");
const User = require('./db');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = "Secret";
const saltRounds = 10;
// create signin function...

mongoose.connect('mongodb+srv://dodakartik26:LzEnLaLX8mejXN2q@cluster0.t5zhc.mongodb.net/test');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());


const getEmailSettings = async () => {
    try {
      const settings = await User.findOne(); // Get the first document (you can adjust if needed)
      return settings;
    } catch (err) {
      console.error('Error fetching email settings:', err);
      throw err;
    }
  };




const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (error, user) => {
            if(error){
                return res.status(403).send("Invalid Token");
            }
            req.user = user;
            next();
        })
    }
    else{
        res.status(401).send("Token Required");
    }
}



const signup = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        await User.create({
            email,
            hashedPassword
        })
        res.status(201).send("User Created");
        res.send("User Created");
    }
    catch(error){
        console.error("Error during signup:", error);
        res.status(500).send("Error Occurred");
    }
}



const signin = async (req, res) => {
    const {email, password} = req.body;
    console.error("Error during signin:", error);
    try{
        const user = await User.findOne({email}).lean();
        if(!user){
            return res.status(400).send("Invalid Email or Password");
        }
        if(await bcrypt.compare(password, user.password) && user.email === email){
            const token = jwt.sign({email: user.email}, JWT_SECRET);
            return res.status(200).json({token : token}).send({token});
        }
    }    
    catch(error){
        console.error("Error during signin:", error);
        res.status(500).send("Error Occurred");
    }

}


  const sendMail = async (req, res) => {
    const {subject, content, email} = req.body;
    const settings = await getEmailSettings();
     try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: settings.email,
              pass: 'nhrb rbag ngqg sqfp'
            }
          });
        
         const mailOptions = {
            from: settings.email,
            to: email,
             subject: subject,
          text: content,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
                res.status(201).json({messages : info.response});
            }
        });
    } 
    catch(error){
        console.error(error);
    }
    }


    const write = async (req, res) => {
        const {type} = req.body;
        const client = new HfInference("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");
        let out = "";
    
        const stream = client.chatCompletionStream({
            model: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
            messages: [
              {
                role: "user",
                content: type
              }
            ],
            max_tokens: 500
          });
          for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
              const newContent = chunk.choices[0].delta.content;
              out += newContent;
              console.log(newContent);
            }
          }
        res.status(201).json({messages : out});
    };
    


app.post("/signup", signup);
app.post("/signin", signin);
app.post("/write",auth, write);
app.post("/email",auth, sendMail);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});