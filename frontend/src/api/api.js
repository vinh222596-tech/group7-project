import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL,
    withCredentials: true
});

export const updateProfileImage = (formData) => {
    return api.put('/profile/me/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateProfileName = (name) => {
    return api.put('/profile/me/name', { name });
};

export const requestPasswordReset = (email) => {
    return api.post('/forgot-password', { email });
};

export const resetPassword = (token, password) => {
    return api.post(`/reset-password/${token}`, { newPassword: password });
};

export const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`);
};

export default api;