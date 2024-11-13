const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "kartik123";
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./DB');


const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://dodakartik26:LzEnLaLX8mejXN2q@cluster0.t5zhc.mongodb.net/spamurai");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};
connect();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'token']
}));



const auth = (req, res, next) => {
    const token = req.headers.token;
    if(token){
        jwt.verify(token, JWT_SECRET, (error, user) => {
            if(error){
                res.json({message: "UnAuthorized"});
            }
            else{
                next();
            }
        });
    }
    else{
        res.json({message: "UnAuthorized"});
    }
}



async function SignUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try{
       await UserModel.create({email: email, password: password});
        res.json({message: "User Created"});
    }
    catch(error){
        res.json({message: "Error Occured"});
    }
}

const SignIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await UserModel.findOne({email: email, password: password});
        if(user) {
            const token = jwt.sign({ id: user._id.toString()}, JWT_SECRET);
            res.json({message: "User Found", token: token});
        }
        else{
            res.json({message: "User Not Found"});
        }
    }
    catch(error){
        res.json({message: "Error Occured"});
    }

}






app.post("/signup", SignUp);
app.post("/signin", SignIn);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
