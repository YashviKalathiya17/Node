const express = require("express");
const axios = require("axios");
const News = require("../models/News");
const router = express.Router();

const API_KEY = "YOUR_NEWS_API_KEY";

router.get("/generate", async (req, res) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
  );
  const article = data.articles[0];
  await News.create({
    title: article.title,
    description: article.description,
    source: article.source.name,
  });
  res.redirect("/news");
});

router.get("/", async (req, res) => {
  const newsList = await News.find().sort({ date: -1 });
  res.render("news", { newsList });
});

router.get("/delete/:id", async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.redirect("/news");
});

module.exports = router;
