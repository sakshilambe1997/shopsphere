import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const postSignup = async (req, res) => {
  const { name, email, phone, address,password, rePassword } = req.body;

  if (password !== rePassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match",
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone is required",
    });
  }

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Address is required",
    });
  }
    
  const saltValue =parseInt(process.env.SALT)
  const salt = bcrypt.genSaltSync(saltValue);
  try {
    const newUser = new User({
      name,
      email,
      phone,
      address,
      password:bcrypt.hashSync(password, salt),
    });

    const savedUser =await newUser.save();
    res.status(201).json({
        success:true,
        message:"User Saved Successfully!!",
        data:{
            name: savedUser.name,
            email: savedUser.email,
            phone:savedUser.phone,
            address:savedUser.address
        }
    })

  } 
  catch (error) {
    res.json({
      success: false,
      message:error.message,
    });
  }
};


const postLogin =async (req,res)=>{
  const {email,password}=req.body

  if(!email || !password){
    return res.status(400).json({
      success:false,
       message:"Email and Password is required"
    })
  }

  const user = await User.findOne({email})
  
  if(!user){
    return res.status(400).json({
      success:false,
      message:"please signup first before login"
    })
  }

  const isPasswordMatch = bcrypt.compareSync(password,user.password)

  if(isPasswordMatch){
    const jwtToken= jwt.sign({email:user.email ,role:user.role ,_id:user._id},process.env.JWT_SECRET);
    
    res.setHeader("Authorization",`Bearer ${jwtToken}`)
    return res.json({
      success:true,
      token:jwtToken,
      message:"Login Successfull!!"
    })
  }

  else{
    return res.status(400).json({
      success:false,
      message:"Invalid Credentials"
    })
  }
}

export { 
  postSignup,
  postLogin
 };
