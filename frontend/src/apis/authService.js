// src/api/authService.js
import apiClient from './apiClient';

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/signin', credentials);
  return response.data;
};

export const register = async (userInfo) => {
  const response = await apiClient.post('/auth/signup', userInfo);
  return response.data;
};
