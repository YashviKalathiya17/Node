import React, { useState } from 'react';
import { external, saved } from '../api';

export default function ExternalFetch(){
  const [joke, setJoke] = useState(null);
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [country, setCountry] = useState('in');
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await external.joke();
      setJoke(res.data);
    } catch (err) { alert('Joke error'); }
    setLoading(false);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await external.news(country);
      setNews(res.data.articles || []);
    } catch (err) { alert('News error'); }
    setLoading(false);
  };

  const fetchWeather = async () => {
    if (!city) return alert('Enter city');
    setLoading(true);
    try {
      const res = await external.weather(city);
      setWeather(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Weather error');
    }
    setLoading(false);
  };

  const saveItem = async (type, title, content, meta) => {
    try {
      await saved.create({ type, title, content, meta });
      alert('Saved to DB');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div>
      <h2>Fetch External Data</h2>
      <div className="controls">
        <div>
          <button onClick={fetchJoke} disabled={loading}>Get Joke</button>
        </div>

        <div>
          <input value={country} onChange={e=>setCountry(e.target.value)} style={{width:60}} />
          <button onClick={fetchNews} disabled={loading}>Get News</button>
        </div>

        <div>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City name" />
          <button onClick={fetchWeather} disabled={loading}>Get Weather</button>
        </div>
      </div>

      {joke && (
        <div className="card">
          <h3>Joke</h3>
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>
          <button onClick={()=> saveItem('joke', joke.setup, joke.punchline, joke)}>Save Joke</button>
        </div>
      )}

      {news.length > 0 && (
        <div className="card">
          <h3>Top News</h3>
          {news.map((a, i) => (
            <div key={i} className="news-item">
              <h4>{a.title}</h4>
              <p>{a.description}</p>
              <button onClick={()=> saveItem('news', a.title, a.description, a)}>Save News</button>
            </div>
          ))}
        </div>
      )}

      {weather && (
        <div className="card">
          <h3>Weather — {weather.name}</h3>
          <p>Temp: {weather.main?.temp} °C</p>
          <p>Condition: {weather.weather?.[0]?.main} — {weather.weather?.[0]?.description}</p>
          <button onClick={()=> saveItem('weather', `Weather: ${weather.name}`, `${weather.main?.temp} °C`, weather)}>Save Weather</button>
        </div>
      )}
    </div>
  );
}
