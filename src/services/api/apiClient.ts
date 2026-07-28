import { axiosInstance } from './axios';
import { setupInterceptors } from './interceptors';

// Configura os interceptors na instância criada
setupInterceptors(axiosInstance);

export const apiClient = {
  get: <T>(url: string, config = {}) => axiosInstance.get<T>(url, config).then(res => res.data),
  post: <T>(url: string, data = {}, config = {}) => axiosInstance.post<T>(url, data, config).then(res => res.data),
  put: <T>(url: string, data = {}, config = {}) => axiosInstance.put<T>(url, data, config).then(res => res.data),
  patch: <T>(url: string, data = {}, config = {}) => axiosInstance.patch<T>(url, data, config).then(res => res.data),
  delete: <T>(url: string, config = {}) => axiosInstance.delete<T>(url, config).then(res => res.data),
};
