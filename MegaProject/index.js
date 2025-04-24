const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
 
const database = require("./config/database");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Routes
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

// Connect to MongoDB
 database.connect();

 

// Connect to Cloudinary
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: [
    "https://studynotion-frontend-inky-eight.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./temp",
}));

// Mount routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/reach", contactUsRoute);

// Health Check route
app.get("/ping", (_, res) => {
  res.send("pong");
});

// Default route
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "✅ Your server is up and running...",
  });
});

// Create HTTP server with extended timeout (Render sometimes causes delays)
const server = http.createServer(app);

server.keepAliveTimeout = 120 * 1000; // 2 minutes
server.headersTimeout = 130 * 1000;   // Slightly more than keepAlive

// Listen for all interfaces (important for Render)
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

