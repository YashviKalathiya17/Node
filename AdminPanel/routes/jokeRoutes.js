const express = require("express");
const axios = require("axios");
const Joke = require("../models/Joke");
const router = express.Router();

// Fetch random joke from API
router.get("/generate", async (req, res) => {
  const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
  const newJoke = await Joke.create({
    setup: data.setup,
    punchline: data.punchline,
  });
  res.redirect("/jokes");
});

// Show all jokes
router.get("/", async (req, res) => {
  const jokes = await Joke.find().sort({ date: -1 });
  res.render("joke", { jokes });
});

// Delete joke
router.get("/delete/:id", async (req, res) => {
  await Joke.findByIdAndDelete(req.params.id);
  res.redirect("/jokes");
});

module.exports = router;
