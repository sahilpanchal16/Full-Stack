const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./routes/User");
const men_route = require("./routes/Men");
const women_route = require("./routes/Women"); // Corrected route import name

const app = express();
require("dotenv").config(); // Load environment variables
require("./Models/db"); // Connect to database
const PORT = process.env.PORT || 5000;

// Simple route to check if server is running
app.get("/ping", (req, res) => {
  res.send("PONG");
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Configure CORS to allow requests from the frontend domain
app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:3000", // Default to localhost if FRONTEND is not set
    credentials: true,
  })
);

// Use route handlers
app.use("/auth", User);
app.use("/Men", men_route);
app.use("/Women", women_route); // Use corrected route name

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
