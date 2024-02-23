import axios from "axios";
export const axiosConfig = axios.create({
    // baseURL: 'https://boardgames-api-attempt2.onrender.com/api',
    baseURL: 'http://localhost:5000',

})