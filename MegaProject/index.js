const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Routes
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

// Database and cloudinary setup
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000, // 20 seconds
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin:  ["https://studynotion-frontend-inky-eight.vercel.app",
                "http://localhost:3000"
    ], 
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
      credentials: true,
      
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp",
  })
);

// Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/reach", contactUsRoute);

// Default test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Create HTTP server and configure timeouts
const server = http.createServer(app);

server.keepAliveTimeout = 120 * 1000; // 120 seconds
server.headersTimeout = 130 * 1000;   // 130 seconds

// Listen on 0.0.0.0 for Render compatibility
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});

