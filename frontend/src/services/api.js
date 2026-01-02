import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const contactService = {
    createContact: async (contactData) => {
        const response = await apiClient.post('/contacts', contactData);
        return response.data.data;
    },

    getAllContacts: async () => {
        const response = await apiClient.get('/contacts');
        return response.data.data;
    },

    getContactById: async (id) => {
        const response = await apiClient.get(`/contacts/${id}`);
        return response.data.data;
    },

    updateContact: async (id, contactData) => {
        const response = await apiClient.put(`/contacts/${id}`, contactData);
        return response.data.data;
    },

    deleteContact: async (id) => {
        const response = await apiClient.delete(`/contacts/${id}`);
        return response.data;
    },
};

export default apiClient;
