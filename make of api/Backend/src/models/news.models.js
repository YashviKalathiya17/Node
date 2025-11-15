const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
        default: []
    }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;