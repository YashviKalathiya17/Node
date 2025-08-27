const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number,
  category: String,
  stock: Number,
  image: String
});

module.exports = mongoose.model("Book", bookSchema);
