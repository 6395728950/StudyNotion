// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendOTP,
  changepassword,
} = require("../controller/Auth")
const {
  resetpasswordtoken,
  resetpassword,
} = require("../controller/ResetPassword")

const { auth } = require("../midlleware/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changepassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetpasswordtoken)

// Route for resetting user's password after verification
router.post("/reset-password", resetpassword)

// Export the router for use in the main application
module.exports = router