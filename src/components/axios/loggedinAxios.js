import axios from 'axios';

const baseURL = 'https://csbsblaze.pythonanywhere.com/';

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
