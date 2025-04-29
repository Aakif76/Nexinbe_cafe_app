const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const User = require("../models/User"); // Import your User model
const Order = require("../models/Order"); // Add at the top

// Register User Route
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).select("name email"); // Fetch only the name and email fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's name and email
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get order by orderId (for tracking)
router.get("/order/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

module.exports = router;
