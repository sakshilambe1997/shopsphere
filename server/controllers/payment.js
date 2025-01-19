
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

const postPayments =async(req,res)=>{

    const{orderId,amount,paymentMode,status,transactionId}=
    req.body;

    let order;

    try{
         order = await Order.findById(orderId);

    }

    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }

    if(!order){
        return res.status(404).json({
            success:false,
            message:"This Order does not exist"
        })
    }

    if(order.status=="delivered" || order.status=="cancelled"){
       return res.status(400).json({
        success:false,
        message:"This order has already been delivered or cancelled"
       })
    }

    const payment= new Payment({
        paymentMode,
        amount,
        transactionId,
        status
    });

    try{
        const savedPayment =await payment.save();
        order.paymentId= savedPayment._id;
        order.paymentMode= paymentMode;

        order.timeline.push({
            status:"Payment Completed",
            date: Date.now()
        })

        await order.save();
        }

    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })


    }

}

export{postPayments}