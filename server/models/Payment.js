import {Schema,model} from "mongoose"

const paymentSchema =new Schema({
    paymentMode:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
     transactionId:{
        type:String,
        required:true
     },
     status:{
        type:String,
        default:"Pending"
     }
},{
    timestamps:true
})

const Payment = model("Payment",paymentSchema)
export default Payment