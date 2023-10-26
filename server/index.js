import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000 ;

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if(conn){
        console.log(`MongoDB connected successfully` )
    }
}

// user signup 
app.post('/signup', async (req, res) => {
    const { name, address, mobile, email, password, gender } = req.body;
    try {
    const newUser = new User({
         name,
         address,
         mobile,
         email,
         password,
         gender
    
    })

    const savedUser = await newUser.save();


    res.json({
        success: true,
        data: savedUser,
        message: 'successfully SignUp'
    })
   } 
   catch(err) {
    res.json({
        success: false,
        message: err.message
    })

   }
});


// user login
app.get('/login', async (req, res) => {
    const {email , password , mobile, name} = req.body;

    const user = await User.findOne({email, password}).select('email name mobile');


    if (user == null) {
        return res.json({
            success: false,
            message: 'Login failed ! Please SignUp first'
        })
    }

    res.json({
        success: true,
        data: user,
        message: 'Login Sucessfully '
    })
}) ;


app.listen(PORT , ()=> {
    console.log(`Server is running on ${PORT}`)
    connectDB();
});