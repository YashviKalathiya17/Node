// This file defines the Weather model for the application.

const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    windSpeed: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;