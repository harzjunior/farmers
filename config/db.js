const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URI = "mongodb://localhost:27017/crop_management_db"; // Your MongoDB connection URI
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
