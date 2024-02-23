const express = require("express");
require("dotenv").config();
const cors = require("./middleware/cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questions");

const app = express();

// Middleware
app.use(express.json());
app.use(cors);

// Routes
app.use(authRoutes);
app.use(questionRoutes);


// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
