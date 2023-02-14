import axios from 'axios';

const baseURL = process.env.REACT_APP_BLAZE_BACKEND_URL;

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
