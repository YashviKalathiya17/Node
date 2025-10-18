import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const external = {
  joke: () => axios.get(`${BASE}/external/joke`),
  news: (country='in') => axios.get(`${BASE}/external/news`, { params: { country } }),
  weather: (city) => axios.get(`${BASE}/external/weather`, { params: { city } })
};

export const saved = {
  list: (type) => axios.get(`${BASE}/saved`, { params: type ? { type } : {} }),
  get: (id) => axios.get(`${BASE}/saved/${id}`),
  create: (data) => axios.post(`${BASE}/saved`, data),
  update: (id, data) => axios.put(`${BASE}/saved/${id}`, data),
  remove: (id) => axios.delete(`${BASE}/saved/${id}`)
};
