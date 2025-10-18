const express = require('express');
const router = express.Router();
const SavedItem = require('../models/SavedItem');

// CREATE saved item
router.post('/', async (req, res) => {
  try {
    const item = new SavedItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// READ all (optionally filter by type)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const q = type ? { type } : {};
    const items = await SavedItem.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const item = await SavedItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const item = await SavedItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await SavedItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
