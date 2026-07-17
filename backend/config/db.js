const mongoose=require("mongoose");
function connectDB(){
mongoose.connect("mongodb://127.0.0.1:27017/unimart")
.then(()=>{
console.log("Mongodb connected");
})
.catch((err)=>{
    console.log(err);
})
}
module.exports=connectDB;