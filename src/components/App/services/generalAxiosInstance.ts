import axios from 'axios';

const axiosGetInstance = axios.create({
    baseURL: 'http://localhost:3000/',
});

const axiosLoggedGetInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
});

const axiosLoggedPostInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export { axiosGetInstance, axiosLoggedPostInstance, axiosLoggedGetInstance };
