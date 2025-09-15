const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (index.html)
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/moviedb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/movies", movieRoutes);

// Start server
app.listen(5002, () =>
  console.log("🚀 Server running on http://localhost:5002")
);
