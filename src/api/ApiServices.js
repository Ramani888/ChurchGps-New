import axios from 'axios';

// const baseURL = 'https://church-gps-backend.vercel.app/api/';
const baseURL = 'http://192.168.1.4:3010/api/'; // --- IGNORE ---
// const baseURL = 'https://churchgps.com/api/'; // --- IGNORE ---

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const token = global.token;
      if (token) {
        config.headers.Authorization = token; // no Bearer prefix
      } else {
        delete config.headers.Authorization;
      }
    } catch (err) {
      console.log('Token read error:', err);
    }
    return config;
  },
  error => Promise.reject(error),
);

const isFormData = body => body instanceof FormData;

export const apiGet = async (url, params = {}, config = {}) => {
  try {
    const response = await api.get(url, { params, ...config });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST
export const apiPost = async (url, body = {}, config = {}) => {
  try {
    const headers = isFormData(body)
      ? { 'Content-Type': 'multipart/form-data' }
      : {};
    const response = await api.post(url, body, {
      ...config,
      headers: { ...headers, ...config.headers },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PUT
export const apiPut = async (url, body = {}, config = {}) => {
  try {
    const headers = isFormData(body)
      ? { 'Content-Type': 'multipart/form-data' }
      : {};
    const response = await api.put(url, body, {
      ...config,
      headers: { ...headers, ...config.headers },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE
export const apiDelete = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Centralized error handler
const handleError = error => {
  if (error.response) {
    console.log('API Error:', error.response.data);
    throw error.response.data;
  } else if (error.request) {
    console.log('No response from API:', error.request);
    throw new Error('No response from server');
  } else {
    console.log('Error:', error.message);
    throw new Error(error.message);
  }
};

// use of above api functions

// import { apiGet, apiPost, apiPut, apiDelete } from './api';

// // GET
// const users = await apiGet('/users');

// // POST
// const newUser = await apiPost('/users', { name: 'Alice', email: 'alice@example.com' });

// // PUT
// const updatedUser = await apiPut('/users/1', { name: 'Alice Updated' });

// // DELETE
// await apiDelete('/users/1');

// const formData = new FormData();
// formData.append('avatar', fileObject);
// formData.append('username', 'Alice');

// await apiPost('/upload', formData);
