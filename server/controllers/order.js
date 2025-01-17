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
  const user= req.user;
  console.log(req.user)

  const {id}= req.params;
    
  let order;
  
  try{

    order = await Order.findById(id);

    if(!order){
      return res.status(400).json({
        sucess:false,
        message:"Order not found"
      })
    }
  }

  catch(e){
    return res.status(400).json({
      sucess:false,
      message:e.message
    })
  }

  // user can update his own order
  if(user.role==user && order.id!=user.id){
    return res.status(400).json({
      sucess:false,
      message:"you are not authorized to update this order"

    })
  }

  // user can cancelled the order if it is not deliverd.

  if(user.role=="user"){

    if(order.status=="deliverd"){
      return res.status(400).json({
        sucess:false,
        message:"Order has already been deliverd"
      })
    }

    if(req.body.status=="cancelled"){
      order.status="Cancelled";
    }

  }

  if(req.body.phone){
    order.phone=req.body.phone;
  }

  if(req.body.deliveryAddress){
    order.deliveryAddress =req.body.deliveryAddress;
  }

  if(user.role=="admin"){
    order.status= req.body.status;
    order.timeline = req.body.timeline;
  }

  await order.save();

  const updateOrder= await Order.findById(id);


   res.json({
    sucess:true,
    message:"Order updated sucessfully",
    data:updateOrder
  })
}

export{postOrders,
  putOrder
}


