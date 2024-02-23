const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0-mocktest.k9orccc.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectDB;
