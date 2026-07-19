const User=require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Product = require("../models/Product");
exports.getUsers=(req,res)=>{
    res.send("welcome to backend")
}
exports.registerUser = async (req, res) => {
    try{
    const existingUser =await User.findOne({
        email : req.body.email
    });

if (existingUser) {
    return res.status(400).json({
        message: "User already exists"
    });
}
const hashedPassword=await bcrypt.hash(req.body.password,10);
const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
});
if(user){
 return res.status(201).json({
    message: "Registration succeeded",

});
}
    }
    catch(err){
        res.status(500).json({
        
  "message": "Internal Server Error"
        })
    };
};
exports.loginUser = async(req,res)=>{
    try{
    const email= req.body.email
    const password= req.body.password
    const user=await  User.findOne({
        email:email
    })
    if(!user){
        return res.status(400).json({
          "message": "Invalid email or password"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(400).json({
        message: "Invalid email or password"
    });
}
const token = jwt.sign(
    { id: user._id },      
    "mysecretkey",         
    { expiresIn: "7d" });
    return res.status(200).json({
    message: "login successfully",
    token
})

    }
    catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}
exports.getProfile = (req, res) => {
    return res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
};

exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

if (!product) {
    return res.status(404).json({
        message: "Product not found"
    });
}
         const user = req.user;
         const cartItem = user.cart.find(item => item.product.equals(productId));
         if(cartItem){
            cartItem.quantity++;
         }else{
            user.cart.push({
                product:productId,
                quantity:1
});
         }
         await user.save();
            return res.status(200).json({
    message: "Product added to cart successfully",
    cart: user.cart
});
         
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.getCart = async (req, res) => {
    try {
        const user = req.user;
        await user.populate("cart.product");
        return res.status(200).json({
    cart: user.cart
});
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const id=req.params.id;
        const user = req.user;
        user.cart = user.cart.filter(item => !item.product.equals(id));
        await user.save();
        return res.status(200).json({
    message: "Product removed from cart successfully",
    cart: user.cart
});
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


exports.updateCartQuantity = async (req, res) => {
    try {
        const productId = req.params.id;
        const quantity = req.body.quantity;
        const user = req.user;

        const cartItem = user.cart.find(
            item => item.product.equals(productId)
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }
        if (quantity < 1) {
    return res.status(400).json({
        message: "Quantity must be at least 1"
    });
}
        cartItem.quantity = quantity;

        await user.save();

        return res.status(200).json({
            message: "Cart quantity updated successfully",
            cart: user.cart
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};