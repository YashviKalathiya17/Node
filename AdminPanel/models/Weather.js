const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: String,
  condition: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Weather", weatherSchema);
