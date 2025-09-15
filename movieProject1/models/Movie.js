const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rate: { type: Number, required: true }
});

module.exports = mongoose.model("Movie", movieSchema);
