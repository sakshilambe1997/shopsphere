import Product from "../models/Product.js";

const postProducts = async (req, res) => {
  const {
    name,
    shortDescription,
    longDescription,
    price,
    currentPrice,
    category,
    images,
    tags,
  } = req.body;

  const mandatoryFeilds = ["name",
    "shortDescription",
    "longDescription",
    "price",
    "category",
    "images"]

    for(const feild of mandatoryFeilds){
        if(!req.body[feild]){
            return res.status(400).json({
                success:false,
                message:`${feild} is required`
            });
        }
    }

    const newProduct = new Product({
     name,
    shortDescription,
    longDescription,
    price,
    currentPrice,
    category,
    images,
    tags,

    })

    try{
        const savedProduct =  await newProduct.save()

        return res.status(200).json({
            success:true,
            message:"Product created successfully!!",
            data:savedProduct
        });
    }

        catch(e){
            return res.status(200).json({
                success:true,
                message:e.message,
            });
        }
}

const getProducts =async(req,res)=>{

    const {limit,search} = req.query;
   const allProducts = await Product.find({

    name:{
        $regex: new RegExp(search || ""),
        $options:"i"
    },

    shortDescription:{
         $regex: new RegExp(search || ""),
        $options:"i"
    },

    longDescription:{
         $regex: new RegExp(search || ""),
        $options:"i"
    }


   }).limit(parseInt(limit) || 10);

   res.json({
    success:true,
    message:"All Products fetched successfully",
    data:allProducts
   })
}

  
export { postProducts,getProducts };
