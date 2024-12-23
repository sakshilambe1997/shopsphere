import Product from "../models/Product";

const postProducts =async(req,res)=>{
    const {name,shortDescription,longDescription,price,currentPrice,category,images,tags}=req.body;

    const newProduct = new Product({
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    })

    const savedProduct = newProduct.save();

    return res.json({
        success:true,
        message:"Product saved successfully!!",
        data:savedProduct
    })
}


export{
    postProducts
}