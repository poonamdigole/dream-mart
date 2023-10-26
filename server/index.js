import express from "express";
import mongoose from "mongoose";
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

app.listen(PORT , ()=> {
    console.log(`Server is running on ${PORT}`)
    connectDB();
});