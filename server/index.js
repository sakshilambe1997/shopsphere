import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import { postLogin, postSignup } from "./controllers/user.js"
import { jwtVerifyMiddleware,checkRoleMiddleware } from "./middlewares/auth.js";
import {getHealth} from "./controllers/health.js"
import jwt from "jsonwebtoken"


import { postProducts } from "./controllers/product.js"



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
app.post("/products",jwtVerifyMiddleware,checkRoleMiddleware, postProducts)

app.get("/test",(req,res)=>{

    const token =req.headers.authorization;

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Unothorized"
        })
    }

    const tokenValue= token.split(" ")[1]

    try{
        const decoded = jwt.verify(tokenValue,process.env.JWT_SECRET)

        if(decoded){
            return res.json({
                success:true,
                message:"Authorized",
                data:decoded
            })
        }
    }
       catch(e){
        return res.status(400).json({
            success:false,
            message:"Unauthorized"
        })

       }

})



// app.post("/order",jwtVerifyMiddleware,(req,res)=>{
//     res.json({
//         success:true,
//         message:"order sucessfully"
//     })
// })

// Auth
app.use("*",(req,res)=>{
    res.status(404).json({
        success:false,
        message:"Api endpoint dosen't exist"

    })
})

//products



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
});

