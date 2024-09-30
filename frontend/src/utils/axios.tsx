import axios from 'axios';

const services = axios.create({
	baseURL: 'http://localhost:3030',
	timeout: 10000,
});

services.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		if (config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			config.headers = { Authorization: `Bearer ${token}` };
		}
	}
	return config;
});

export default services;
