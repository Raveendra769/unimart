
const express=require("express");
const app=express();
const connectDB=require("./config/db")
const userRoutes = require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
app.use(express.json());
app.use("/api/users", userRoutes)
app.use("/api/product", productRoutes);
connectDB();
app.listen(8000,()=>
    console.log("server started")
);
