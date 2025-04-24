// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();

// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");

// const database = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");

// // Import Routes
// const userRoute = require("./routes/User");
// const courseRoute = require("./routes/Course");
// const profileRoute = require("./routes/Profile");
// const paymentRoute = require("./routes/Payment");

// const PORT = process.env.PORT || 4000;

// // Connect to DB
// database.connect();

// // Middlewares
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// app.use(cookieParser());
// app.use(
//   cors({
//     origin:["https://studynotion-frontend-inky-eight.vercel.app",
//            "http://localhost:3000"
//     ],  
//     credentials: true,
//   })
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/temp",
//   })
// );

// // Cloudinary Config
// cloudinaryConnect();

// // Routes
// app.use("/api/v1/auth", userRoute);
// app.use("/api/v1/profile", profileRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/payment", paymentRoute);

// // Default Route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running...",
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
