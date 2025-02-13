import { createServer, Server as HttpServer } from 'http';
import dotenv from 'dotenv';

import app from '@/libs/express';
import { AppDataProvider, LogDataProvider } from '@/providers';

dotenv.config();
class Server {
	private server: HttpServer;

	private port: string | number;

	constructor(port?: string | number) {
		this.port = port || process.env.APP_PORT || 3000;

		this.server = createServer(app);
	}

	private async initializeDatabases() {
		try {
			AppDataProvider.initialize();
			LogDataProvider.initialize();
		} catch (error) {
			console.error('Error initializing data source', error);
		}
	}

	async start() {
		await this.initializeDatabases();

		this.server.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}

export default Server;
