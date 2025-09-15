const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// Create Blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All Blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Update Blog
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
