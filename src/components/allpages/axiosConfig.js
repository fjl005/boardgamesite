import axios from "axios";
export const axiosConfig = axios.create({
    // baseURL: 'https://boardgamesite-backend.onrender.com',
    baseURL: 'http://localhost:5000',

})