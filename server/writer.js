const express = require('express');
const {HfInference} = require("@huggingface/inference");
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const app = express();
const User = require('./db');
app.use(cors({
    origin: '*'
}));
// fetch the data from MongoDB
const mongoURI = 'mongodb+srv://dodakartik26:LzEnLaLX8mejXN2q@cluster0.t5zhc.mongodb.net/test';

const connect = async  ()=>{
    try{
      await mongoose.connect(mongoURI);
    }
    catch(error){
        console.error("Error during connection:", error);
    }   
}

connect();

const useremaail = async (email)=>{
    try{
        const user= await user.findOne({});
        console.log('Users:', user);
    }
    catch(error){
        console.error("Error during connection:", error);
    }
}

useremaail();

app.use(express.json());    

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kartikdoda86@gmail.com',
      pass: 'nhrb rbag ngqg sqfp'
    }
  });

  const sendMail = async (req, res) => {
    const {subject, content, email} = req.body;
     try{
         const mailOptions = {
            from: 'kartikdoda86@gmail.com',
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


app.post("/write", write);
app.post("/email", sendMail);


app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});