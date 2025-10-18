const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

// JOKE: random joke each request
router.get('/joke', async (req, res) => {
  try {
    const r = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    res.json(r.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

// NEWS: top headlines (country param optional, default 'in' for India)
router.get('/news', async (req, res) => {
  try {
    const country = req.query.country || 'in';
    if (!NEWS_API_KEY) return res.status(500).json({ error: 'NEWS_API_KEY not set on server' });

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${NEWS_API_KEY}`;
    const r = await axios.get(url);
    // return top 10 articles (or less)
    res.json({ articles: (r.data.articles || []).slice(0, 10) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// WEATHER: current weather by city (q param)
router.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'city query param required' });
    if (!OPENWEATHER_KEY) return res.status(500).json({ error: 'OPENWEATHER_KEY not set on server' });

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_KEY}&units=metric`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (err) {
    console.error(err.message);
    // OpenWeather returns 404 for unknown city
    if (err.response && err.response.data) {
      res.status(err.response.status || 500).json({ error: err.response.data.message || 'Weather API error' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather' });
    }
  }
});

module.exports = router;
