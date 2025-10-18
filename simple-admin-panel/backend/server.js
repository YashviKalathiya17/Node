import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ===== Database connection =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// ===== Schema =====
const ItemSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Item = mongoose.model("Item", ItemSchema);

// ===== CRUD Routes =====
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.put("/api/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ===== External APIs =====

// Joke API
app.get("/api/joke", async (req, res) => {
  try {
    const { data } = await axios.get(process.env.JOKE_API);
    res.json({ setup: data.setup, punchline: data.punchline });
  } catch {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

// News API
app.get("/api/news", async (req, res) => {
  try {
    const { data } = await axios.get(process.env.NEWS_API);
    res.json(data.articles.slice(0, 5));
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Weather API
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Delhi";
  try {
    const { data } = await axios.get(
      `${process.env.WEATHER_API}?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`
    );
    res.json({
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// Root route (to test)
app.get("/", (req, res) => {
  res.send("✅ Backend running properly");
});

// ===== Server start =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
