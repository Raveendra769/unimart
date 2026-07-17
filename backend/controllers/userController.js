const User=require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
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

