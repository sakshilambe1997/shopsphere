import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import { postLogin, postSignup } from "./controllers/user.js"
import { jwtVerifyMiddleware,checkRoleMiddleware } from "./middlewares/auth.js";
import {getHealth} from "./controllers/health.js"
import jwt from "jsonwebtoken"
import { postProducts ,getProducts} from "./controllers/product.js"
import { postOrders ,putOrder,getOrderById,getOrderByUserId} from "./controllers/order.js";
import { postPayments } from "./controllers/payment.js";

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

//products
app.post("/products",jwtVerifyMiddleware,checkRoleMiddleware, postProducts)
app.get("/products",getProducts)

//orders
app.post("/orders",jwtVerifyMiddleware,postOrders)
app.put("/orders/:id",jwtVerifyMiddleware,putOrder)
app.get("/orders/:id",jwtVerifyMiddleware,getOrderById)
app.get("/orders/user/:id",jwtVerifyMiddleware,getOrderByUserId)


//Payments
app.post("/payments",jwtVerifyMiddleware,postPayments)

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


// Auth
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

