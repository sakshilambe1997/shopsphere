import Order from "./../models/Order.js"

const postOrders = async(req,res)=>{
    const {
        products,
        deliveryAddress,
        phone,
        paymentMode,
        }= req.body

        if(!products || !deliveryAddress || !phone|| !paymentMode){
            return res.status(400).json({
                sucess:false,
                message:`Products, DeliveryAddress,Phone,PaymentMode are required`
            })
        }

        let totalBill= 0;

      products.forEach((product)=>{
        totalBill+= product.price * product.quantity;
      });

      try{

        const newOrder = new Order({
            userId:req.user._id,
            products,
            deliveryAddress,
            phone,
            paymentMode,
            totalBill
        })

        const savedOrder =await newOrder.save();

       return res.json({
            sucess:true,
            message:"Order Placed Successfully!",
            data:savedOrder
        })
      }

      catch(error){
        return res.status(400).json({
            sucess:false,
            message:error.message

        })

      }
    

    }


const putOrder = async (req,res)=>{
  console.log(req.user)

  const {id}= req.params

  try{
    const order = await Order.findById(id);

    if(!order){
      return res.json({
        sucess:false,
        message:"Order not found"
      })
    }
  }

  catch(e){
    return res.json({
      sucess:false,
      message:e.message
    })
  }

   res.json({
    sucess:true,
    message:"Order updated sucessfully"
  })
}

export{postOrders,
  putOrder
}