import dotenv from 'dotenv';

dotenv.config();

import Server from '@/Server';

const server = new Server();

try {
	server.start();
} catch (error) {
	console.error('Error starting server:', error);
}
