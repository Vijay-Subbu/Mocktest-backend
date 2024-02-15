const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin:
      "https://dc2cb84a-06da-4e57-9fed-7f3dc9799536-00-3j18e3f6ucmc7.sisko.replit.dev",
  })
);

// Sample data for mock tests
const mockTests = [
  {
    id: 1,
    name: "NEET Mock Test 1",
    subjects: ["Physics", "Chemistry", "Biology"],
    duration: "3 hours",
    questions: [
      {
        id: 1,
        question: "Question 1",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
      },
      {
        id: 2,
        question: "Question 2",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option B",
      },
    ],
  },
  {
    id: 2,
    name: "NEET Mock Test 2",
    subjects: ["Botany", "Zoology", "chemistry"],
    duration: "3 hours",
    questions: [
      {
        id: 1,
        question: "Question 1",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option C",
      },
      {
        id: 2,
        question: "Question 2",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option D",
      },
    ],
  },
];

// Connect to MongoDB
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0-mocktest.k9orccc.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
mongoose.connection.on("error",err =>{ console.log(err)  })

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("Authorization", token).send(token);
});

// Get all mock tests
app.get("/api/mock-tests", (req, res) => {
  res.json(mockTests);
});

// Get a specific mock test by ID
app.get("/api/mock-test/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const mockTest = mockTests.find((test) => test.id === id);
  if (mockTest) {
    res.json(mockTest);
  } else {
    res.status(404).json({ message: "Mock test not found" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
