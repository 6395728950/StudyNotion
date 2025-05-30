// Import the required modules
const express = require("express");
const router = express.Router();
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controller/Payment");
const { auth, isInstructor, isStudent, isAdmin } = require("../midlleware/auth"); // Fix typo "midlleware" -> "middleware"

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;
