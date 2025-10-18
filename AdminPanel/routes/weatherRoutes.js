const express = require("express");
const axios = require("axios");
const Weather = require("../models/Weather");
const router = express.Router();

const API_KEY = "YOUR_OPENWEATHER_API_KEY";

router.get("/generate/:city", async (req, res) => {
  const city = req.params.city;
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  await Weather.create({
    city: data.name,
    temperature: data.main.temp + "°C",
    condition: data.weather[0].main,
  });
  res.redirect("/weather");
});

router.get("/", async (req, res) => {
  const weatherData = await Weather.find().sort({ date: -1 });
  res.render("weather", { weatherData });
});

router.get("/delete/:id", async (req, res) => {
  await Weather.findByIdAndDelete(req.params.id);
  res.redirect("/weather");
});

module.exports = router;
