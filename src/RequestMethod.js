import axios from 'axios';
const BASE_URL = "https://localhost:5001/api/";
//"https://localhost:5001/api/";
//"https://localcommercialplatform-api.azurewebsites.net/api/";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        let token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);