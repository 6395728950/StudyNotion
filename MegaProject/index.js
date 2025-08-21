const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
const database = require("./config/database");
database.connect();

// Connect to Cloudinary
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// ✅ CORS configuration (moved to top for best practice)
const corsOptions = {
  origin: [
    'https://studynotion-frontend-inky-eight.vercel.app'
    // 'https://studynotion-frontend.vercel.app',
    // 'http://localhost:3000'
   
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Enable preflight response for all routes
app.options("*", cors());

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./temp",
}));

// Routes
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/reach", contactUsRoute);

// Health Check
app.get("/ping", (_, res) => {
  conosle.log("it's feel unhealthy");
  res.send("pong");
});

// Root route
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "✅ Your server is up and running...",
  });
});

// HTTP Server with extended timeout for Render
const server = http.createServer(app);

server.keepAliveTimeout = 120 * 1000; // 2 minutes
server.headersTimeout = 130 * 1000;   // Slightly more than keepAlive

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});


