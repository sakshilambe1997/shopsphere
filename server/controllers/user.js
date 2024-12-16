import User from "./../models/User.js";

const postSignup = async (req, res) => {
  const { name, email, phone, address, password, rePassword } = req.body;

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

  try {
    const newUser = new User({
      name,
      email,
      phone,
      address,
      password,
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

export { postSignup };
