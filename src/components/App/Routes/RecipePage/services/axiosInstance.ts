import axios from 'axios';

const axiosGetInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export default axiosGetInstance;
