const Product=require("../models/Product");

exports.createProduct = async (req, res) => {
    try{
        const title = req.body.title;
const price = req.body.price;
const description = req.body.description;
const product = await Product.create({
    title,
    price,
    description,
    image: req.file ? req.file.filename : null,
    seller: req.user._id
});
return res.status(201).json({
    message: "Product created successfully",
    product
});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
    message: "Internal Server Error"
});
    }
};
exports.getAllProducts = async (req, res) => {
    try{
const products = await Product.find().populate("seller", "name email");
return res.status(200).json({
    products
})
    }
    catch(err){
    console.log(err);

    return res.status(500).json({
        message: "Internal Server Error"
    });
}
};
exports.getProductById = async (req, res) => {
    try{
const id = req.params.id;
const product=await Product.findById(id);

if (!product) {
    return res.status(404).json({
        message: "Product not found"
    });
}
    
    return res.status(200).json({
    product
});
    
    }
      catch(err){
    console.log(err);

    return res.status(500).json({
        message: "Internal Server Error"
    });
      }
}
exports.updateProduct = async (req,res) => {
    try{
        const id=req.params.id;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({
                message:"product not found"
            });
        }
      if (!product.seller.equals(req.user._id)) {
    return res.status(403).json({
        message: "Not have access"
    });
}
        
            product.title=req.body.title;
            product.price=req.body.price;
            product.description=req.body.description;
            await product.save();
            return res.status(200).json({
    message: "Product updated successfully",
    product
});
        
    }
     catch(err){
    console.log(err);

    return res.status(500).json({
        message: "Internal Server Error"
    });
      }
}

exports.deleteProduct = async (req, res) => {
    try{
const id = req.params.id;
const product = await Product.findById(id);
if (!product) {
    return res.status(404).json({
        message: "Product not found"
    });
}
if (!product.seller.equals(req.user._id)) {
    return res.status(403).json({
        message: "Not authorized"
    });
}
await product.deleteOne();
return res.status(200).json({
    message: "Product deleted successfully"
});
    }
    catch(err){
    console.log(err);

    return res.status(500).json({
        message: "Internal Server Error"
    });
      }
};