import cors from 'cors';

export default () =>
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		exposedHeaders: ['Content-Type', 'Authorization'],
		credentials: false,
	});
