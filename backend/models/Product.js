const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    image: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;