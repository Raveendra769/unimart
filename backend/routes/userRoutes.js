const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
router.post("/register", userController.registerUser);
router.get("/", userController.getUsers);
router.post("/login",userController.loginUser);
router.get(
    "/profile",
    authMiddleware,
    userController.getProfile
);
router.post("/cart/:id", authMiddleware, userController.addToCart);

router.get("/cart", authMiddleware, userController.getCart);

router.delete("/cart/:id", authMiddleware, userController.removeFromCart);
module.exports = router;