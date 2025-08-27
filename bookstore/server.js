const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use("/", authRoutes);     // login, register routes
app.use("/", bookRoutes);     // book listing, details routes

// Default route (Home)
app.get("/", (req, res) => {
  res.render("home", { title: "Welcome to Online Bookstore" });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
