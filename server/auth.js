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
const zod = require('zod');
// create signin function...

mongoose.connect('mongodb+srv://dodakartik26:LzEnLaLX8mejXN2q@cluster0.t5zhc.mongodb.net/test');

const userobj = zod.object({
    email: zod.string().email().min(1).max(255),
    password: zod.string().min(8).max(255),
    name: zod.string().min(1).max(255)
})

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
    const token = req.headers['token']; // Gets token after 'Bearer'

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;  // Attach user information to the request object
        next();  // Pass to the next middleware or route handler
    });
}


const signup = async (req, res) => {
    const validate = userobj.safeParse(req.body);

    if (!validate.success) {
        // Return validation errors with 400 status
        return res.status(400).json({ errors: validate.error.errors });
    }

    // Destructure after successful validation
    const { email, password, name } = validate.data;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            hashedPassword
        });

        await newUser.save();

        res.status(201).send("User Created");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error Occurred");
    }
};



const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid Credentials");
        }

        // Check if hashedPassword exists
        if (!user.hashedPassword) {
            console.error("Error: User record is missing hashedPassword");
            return res.status(500).send("User record is corrupted. Please contact support.");
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid Credentials");
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.status(200).json({ token, message: "Signin successful" });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).send("An error occurred during signin");
    }
};



  const sendMail = async (req, res) => {
    const {content, email} = req.body;
    
     try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "kartikdoda86@gmail.com",
              pass: 'nhrb rbag ngqg sqfp'
            }
          });
        
         const mailOptions = {
            from: "kartikdoda86@gmail.com",
            to: email,
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
        const { type } = req.body;
    
        // Ensure 'type' is provided and is a valid string
        if (!type || typeof type !== 'string') {
            return res.status(400).json({ message: "Invalid 'type' provided" });
        }
    
        const client = new HfInference("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");
        let out = "";
    
        try {
            const stream = client.chatCompletionStream({
                model: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
                messages: [
                    {
                        role: "Just an Email Writer",
                        content: type
                    }
                ],
                max_tokens: 200
            });
    
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content;
                    out += newContent;
                    console.log(newContent);
                }
            }
    
            // Send the final response after streaming is complete
            res.status(201).json({ messages: out });
    
        } catch (error) {
            console.error("Error with Hugging Face API:", error);
            res.status(500).json({ message: "Error with Hugging Face API", error: error.message });
        }
    };


    const validate = async (req, res) => {
        const { email } = req.body;
    
        try {
           
            const user = await User.findOne({ email });
    
           
            const token = req.headers['token'];
            if (user && token) {
                return res.status(200).json({ message: "User exists" });
            } 
        
            return res.status(200).json({ message: "User needs to sign up." });
    
        } catch (error) {
            console.error("Error during validation:", error);
            res.status(500).send("An error occurred during validation");
        }
    };
    

    
    


app.post("/signup", signup);
app.post("/signin", signin);
app.post("/write",auth, write);
app.post("/email",auth, sendMail);
app.post("/validate", validate);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});