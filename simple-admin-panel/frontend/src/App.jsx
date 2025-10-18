import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExternalFetch from './pages/ExternalFetch';
import SavedItems from './pages/SavedItems';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <aside className="sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/external">Fetch</Link>
            <Link to="/saved">Saved Items</Link>
          </nav>
        </aside>

        <div className="main">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/external" element={<ExternalFetch />} />
              <Route path="/saved" element={<SavedItems />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
