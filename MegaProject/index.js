const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Middleware dependencies
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Import Routes
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

// Database connection
const database = require("./config/database");

// Cloudinary setup
const { cloudinaryConnect } = require("./config/cloudinary");

// Set up port
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware setup
app.use(express.json({ limit: "100mb" })); // Set JSON limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Handle URL-encoded data
app.use(cookieParser()); // For cookie handling

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000", // React development server
      "https://studynotion-frontend-inky-eight.vercel.app", // Production frontend
    ],
    credentials: true,
  })
);

// File upload setup
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp", // Make sure temp directory exists
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes setup
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/reach", contactUsRoute);

// Default route for testing server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 App is running at http://localhost:${PORT}`);
});
