const express=require("express");
const upload = require("../middleware/uploadMiddleware");
const router=express.Router();
const productController=require("../controllers/ProductController");
const {authMiddleware}=require("../middleware/authMiddleware");
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    productController.createProduct
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", authMiddleware, productController.updateProduct);
module.exports=router;