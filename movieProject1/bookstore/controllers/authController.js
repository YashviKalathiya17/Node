const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists!");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("Error registering user");
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials!");

    // create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error logging in");
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
