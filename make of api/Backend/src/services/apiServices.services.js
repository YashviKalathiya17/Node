const axios = require('axios');

const apiServices = {
    fetchJokes: async () => {
        try {
            const response = await axios.get('https://api.example.com/jokes');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching jokes: ' + error.message);
        }
    },

    fetchNews: async () => {
        try {
            const response = await axios.get('https://api.example.com/news');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching news: ' + error.message);
        }
    },

    fetchWeather: async (location) => {
        try {
            const response = await axios.get(`https://api.example.com/weather?location=${location}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching weather: ' + error.message);
        }
    }
};

module.exports = apiServices;