const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// CREATE
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted", movie });
});

module.exports = router;
