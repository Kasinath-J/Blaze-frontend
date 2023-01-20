import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
		Authorization: localStorage.getItem('credential')
			? 'Bearer ' + localStorage.getItem('credential')
			: null,
        accept: 'application/json',
    },
});
