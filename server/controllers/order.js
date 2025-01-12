
const postOrders = async(req,res)=>{
   
console.log(req.user);

    res.json({
        success:true,
        message:"orderd sucessfully"
    })
}

export{postOrders}