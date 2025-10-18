import React, { useEffect, useState } from 'react';
import { saved } from '../api';

export default function Dashboard(){
  const [counts, setCounts] = useState({ total:0, news:0, joke:0, weather:0 });
  useEffect(()=> {
    async function load(){
      try {
        const res = await saved.list();
        const items = res.data;
        setCounts({
          total: items.length,
          news: items.filter(i=>i.type==='news').length,
          joke: items.filter(i=>i.type==='joke').length,
          weather: items.filter(i=>i.type==='weather').length
        });
      } catch (err) { console.error(err); }
    }
    load();
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat">Total saved <div className="num">{counts.total}</div></div>
        <div className="stat">News <div className="num">{counts.news}</div></div>
        <div className="stat">Joke <div className="num">{counts.joke}</div></div>
        <div className="stat">Weather <div className="num">{counts.weather}</div></div>
      </div>
      <p className="muted">Click on Fetch → Save to store items into DB.</p>
    </div>
  );
}
