import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import { postLogin, postSignup } from "./controllers/user.js"
import {getHealth} from "./controllers/health.js"

import { jwtVerifyMiddleware } from "./middlewares/auth.js";


const app =express()
app.use(express.json());
app.use(cors());



const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    if(conn){
        console.log("MongoDB connected successfully!!")
    }
}
connectDB()
app.get("/",getHealth)
app.post("/signup",postSignup);
app.post("/login",postLogin)

app.post("/order", jwtVerifyMiddleware,(req,res)=>{
    res.json({
       success:true,
    message:"Order placed successfully!!"
    })
})


app.post("/payment", jwtVerifyMiddleware,(req,res)=>{
    res.json({
       success:true,
    message:"Payment successfully!!"
    })
   
})




app.use("*",(req,res)=>{
    res.status(404).json({
        success:false,
        message:"Api endpoint dosen't exist"

    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
});

