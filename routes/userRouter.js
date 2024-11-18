const express = require("express");
const {
  handleUserRegistration,
  handleUserLogin,
  handleDashboard,
  handleForgetPassword,
  handleUpdateProfile,
  handleGetOrdersController,
  handleGetAllOrdersController,
  handleOrderStatusController,
  testController,
} = require("../controllers/userController");

const { auth, isAdmin } = require("../Middlewares/authMiddleware");
const router = express.Router();

// Registration Route
router.post("/register", handleUserRegistration);

// Login Route
router.post("/login", handleUserLogin);

// Protected User Dashboard Route
router.get("/user-dashboard", auth, handleDashboard);

// Protected Admin Dashboard Route
router.get("/admin-dashboard", auth, isAdmin, handleDashboard);

// Forget Password
router.post("/forgetpassword", handleForgetPassword);

// Update User Profile
router.put("/profile", auth, handleUpdateProfile);

// Get Orders
router.get("/orders",auth,handleGetOrdersController);

//Get All Orders
router.get("/all-orders", auth, isAdmin, handleGetAllOrdersController);

// Update Order Status
router.put(
  "/order-status/:orderId",
  auth,
  isAdmin,
  handleOrderStatusController
);

// Test Route
router.get("/test", auth, isAdmin, testController);

module.exports = router;
