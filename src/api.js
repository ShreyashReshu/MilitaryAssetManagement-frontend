import axios from 'axios';

const API = axios.create({
    baseURL: 'https://militaryassetmanagement-2tbh.onrender.com/api', // Your live backend
});

// Add Token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;