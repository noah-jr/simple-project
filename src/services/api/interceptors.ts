import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';
import { ENDPOINTS } from './endpoints';

const getAccessToken = () => localStorage.getItem('access_token');
const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Logging para debug em ambiente de desenvolvimento
      if (import.meta.env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      if (import.meta.env.DEV) {
        console.log(`[API Response] ${response.config.url}`, response.data);
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Log global de erro
      console.error('[API Error]', error.response?.data || error.message);

      // Refresh Token Logic
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) throw new Error('No refresh token');

          const response = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: new_refresh } = response.data;
          setTokens(access_token, new_refresh);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          // Se o refresh falhar, limpa tudo e redireciona
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
