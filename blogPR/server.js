const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/blogs", blogRoutes);

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
