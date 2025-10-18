const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const Product = require("./models/Product");

const newsRoutes = require("./routes/newsRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const jokeRoutes = require("./routes/jokeRoutes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/admincrud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("✅ MongoDB Connected");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

const ADMIN = { username: "admin", password: "1234" };
function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect("/login");
}

app.get("/", (req, res) => res.redirect("/dashboard"));

// Auth
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
app.get("/logout", (req, res) => req.session.destroy(() => res.redirect("/login")));

// Product CRUD (your existing routes)
app.get("/dashboard", isLoggedIn, async (req, res) => {
  const products = await Product.find();
  res.render("dashboard", { products });
});
app.post("/add", isLoggedIn, async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.redirect("/dashboard");
});
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});
app.post("/update/:id", isLoggedIn, async (req, res) => {
  const { name, price } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price });
  res.redirect("/dashboard");
});
app.get("/delete/:id", isLoggedIn, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});

// Additional APIs
app.use("/news", isLoggedIn, newsRoutes);
app.use("/weather", isLoggedIn, weatherRoutes);
app.use("/jokes", isLoggedIn, jokeRoutes);

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
