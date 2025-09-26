import axios from 'axios';
import { getApiBaseUrl } from './utils';

export const httpClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ai-token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error', error);
    return Promise.reject(error);
  }
);
