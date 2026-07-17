const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    title:String,
    price:Number,
    seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
    description:String,
});
const product = mongoose.model("product",productSchema)
module.exports=product;
