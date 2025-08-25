import axios from 'axios';
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || 'https://mern-backend.onrender.com/api'
    : 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = (credentials) => API.post('/auth/login', credentials);
export const getProfile = () => API.get('/auth/profile');

// Agents API
export const getAgents = () => API.get('/agents');
export const createAgent = (agentData) => API.post('/agents', agentData);
export const deleteAgent = (id) => API.delete(`/agents/${id}`);

// Lists API
export const getLists = () => API.get('/lists');
export const uploadList = (formData) => API.post('/lists', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getListById = (id) => API.get(`/lists/${id}`);

export default API;