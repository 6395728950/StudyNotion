const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();
exports.connect = async () => {
    
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // 20 sec for server selection
      socketTimeoutMS: 45000,           // 45 sec for inactivity
    });
    console.log("✅ MongoDB connection established");

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Mongoose disconnected");
    });

  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
