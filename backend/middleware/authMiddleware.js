const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.authMiddleware= async (req,res,next)=>{
    try{const authHeader = req.headers.authorization;
if(!authHeader){
    return res.status(401).json({
"message": "No token provided"
    })   
}
const token = authHeader.split(" ")[1];
const decoded = jwt.verify(token, "mysecretkey");
const user = await User.findById(decoded.id);
req.user = user;
next();}
catch (err) {
    console.log(err);
    return res.status(401).json({
        message: err.message
    });
}

}