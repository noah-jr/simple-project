import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.petrohost.ao/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
