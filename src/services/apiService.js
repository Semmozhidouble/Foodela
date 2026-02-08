import apiClient from './api';

// Health Check
export const checkHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

// Authentication APIs (Phase E2)
export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

// Restaurant APIs (Phase E3)
export const restaurantAPI = {
  getAll: async () => {
    const response = await apiClient.get('/restaurants');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },
  
  getMenu: async (id) => {
    const response = await apiClient.get(`/restaurants/${id}/menu`);
    return response.data;
  },
};

// Order APIs (Phase E4)
export const orderAPI = {
  create: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },
  
  getById: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },
  
  getMyOrders: async () => {
    const response = await apiClient.get('/orders/my');
    return response.data;
  },
};
