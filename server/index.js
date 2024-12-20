import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { postLogin, postSignup } from "./controllers/user.js"
import {getHealth} from "./controllers/health.js"
import jwt from "jsonwebtoken"
dotenv.config()

const app =express()
app.use(express.json());
app.use(cors());

const jwtVerifyMiddleware= async(req,res,next)=>{
    const jwtToken =req.headers.suthorization.split(" ")[1];

    if(!jwtToken){
        return res.status(401).json({
            success:false,
            message:"jwt token is missing"
        })
    }

    try{
        const decoded= await jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }

    catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid jwt token"
        })
    }
}

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

