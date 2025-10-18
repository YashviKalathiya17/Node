const mongoose = require('mongoose');

const SavedItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['news','joke','weather'], required: true },
  title: { type: String },
  content: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed }, // full raw JSON from source
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedItem', SavedItemSchema);
