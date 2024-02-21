const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const mockTests = require('./Data');

// Middleware
app.use(express.json());
app.use(
  cors({
    origin:
      "https://dc2cb84a-06da-4e57-9fed-7f3dc9799536-00-3j18e3f6ucmc7.sisko.replit.dev",
  })
);

// Route to get all questions
app.get('/api/questions', (req, res) => {
  const allQuestions = mockTests.map(test => test.questions).flat();
  res.json(allQuestions);
});

// Route to get a specific question by test ID and question ID
app.get('/api/:testId/questions/:questionId', (req, res) => {
  const { testId, questionId } = req.params;
  const test = mockTests.find(test => test.id === parseInt(testId));
  if (!test) {
    return res.status(404).json({ message: 'Test not found' });
  }
  const question = test.questions.find(question => question.id === parseInt(questionId));
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }
  res.json(question);
});

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

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
