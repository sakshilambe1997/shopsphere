import { Schema,model } from "mongoose";

const orderSchema= new Schema({
    userId:{
       type:Schema.Types.ObjectId,
       ref:"User"
    },

    products:{
        productId:{
            type:Schema.Types.ObjectId,
            ref:"Product",
            required:true,
        },

        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true
        }
    },
    totalBill:{
        type:Number,
        required:true
    },
    deliveryAddress:{
        type:String,
        required:true
    },
    phone:{
       type:String
    },
    paymentMode:{
        type:String,
        required:true
    },
    paymentId:{
        type:Schema.Types.ObjectId,
        ref:"Payment",
        required:true
    },
    status:{
        type:String,
        required:true
    },
    timeline:{
        status:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now

        }
    }
    
},{
    timestamps:true
})

const Order = model("Order",orderSchema)
export default Order