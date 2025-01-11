// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.yoursite.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Conditionally attach token only for protected routes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Skip adding token for login and register routes
  if (token && !['/auth/login', '/auth/register'].includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
