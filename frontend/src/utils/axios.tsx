import axios, { AxiosInstance } from 'axios';

const services: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3030',
	timeout: 10000,
});

services.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default services;
