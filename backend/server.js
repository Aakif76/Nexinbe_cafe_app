require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const razorpayRoutes = require("./routes/razorpayRoutes");

const app = express();
const upload = multer(); 

//  Enable CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://nexinbe-cafe-app-8gyx.vercel.app',
    'https://nexinbe-cafe-app.vercel.app',
    'https://nexinbe-cafe-app-8gyx-git-main-ravichandra-l-ss-projects.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add this line after CORS middleware
app.options('*', cors());

// app.options('*', cors());

app.use(express.json()); // Handles JSON data

//  Middleware (Correct Order)
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data

//  Route Setup
app.use("/api/admin", adminRoutes);  
app.use("/api/auth", userRoutes);  
app.use("/api/menu", menuRoutes);  
app.use("/api/razorpay", razorpayRoutes);
//app.use('/api/menuitems', menuItemsRouter);

// Add an error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//  Default Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

//  Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));