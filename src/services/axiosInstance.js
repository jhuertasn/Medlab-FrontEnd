import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8898/medlab',
});

// Añade el token dinámicamente antes de cada request
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default instance;