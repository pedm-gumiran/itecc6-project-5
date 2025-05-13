// src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // change if needed
});

export default api;
