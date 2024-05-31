import { createServer, Server as HttpServer } from 'http';
import dotenv from 'dotenv';

import app from '@/libs/express';
import { Provider } from '@/providers';

dotenv.config();
class Server {
	private server: HttpServer;
	private provider: Provider;

	private port: string | number;

	constructor(port?: string | number) {
		this.port = port || process.env.APP_PORT || 3000;

		this.server = createServer(app);
		try {
			this.provider = Provider.getInstance();
		} catch (error) {
			console.error('Error initializing provider:', error);
		}
	}

	private async initializeDatabases() {
		// try {
		this.provider.initializeAppDataSource();
		// } catch (error) {
		// console.error('Error initializing app data source');
		// }
		// this.provider.initializeLogsDataSource();
	}

	async start() {
		await this.initializeDatabases();

		this.server.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		});
	}
}

export default Server;
