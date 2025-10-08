const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const Product = require("./models/Product");

const app = express();

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/admincrud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("✅ MongoDB Connected");

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Dummy Admin Credentials
const ADMIN = { username: "admin", password: "1234" };

// Middleware for auth check
function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect("/login");
}

// Routes
app.get("/", (req, res) => res.redirect("/login"));

// Login
app.get("/login", (req, res) => res.render("login", { error: null }));
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    req.session.loggedIn = true;
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid Credentials" });
  }
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

// Dashboard (Read all)
app.get("/dashboard", isLoggedIn, async (req, res) => {
  const products = await Product.find();
  res.render("dashboard", { products });
});

// Add
app.post("/add", isLoggedIn, async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.redirect("/dashboard");
});

// Edit page
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});

// Update
app.post("/update/:id", isLoggedIn, async (req, res) => {
  const { name, price } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price });
  res.redirect("/dashboard");
});

// Delete
app.get("/delete/:id", isLoggedIn, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});

// Server
app.listen(3000, () => console.log("🚀 Server started at http://localhost:3000"));
