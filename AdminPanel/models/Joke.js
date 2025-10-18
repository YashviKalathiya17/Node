const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  setup: String,
  punchline: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Joke", jokeSchema);
