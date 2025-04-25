const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connect = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000
    });

    console.log("✅ MongoDB connection established");

    // Connection event handlers
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected");
      // Optional: Implement reconnection logic here
    });

    return db;
    
  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error.message);
    console.error("Full error:", error);
    
    // More specific error handling
    
    
    process.exit(1); // Exit with failure
  }
  // Add this before your mongoose.connect()
 
};