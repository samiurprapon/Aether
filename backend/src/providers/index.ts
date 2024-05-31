import 'reflect-metadata';
import { DataSource } from 'typeorm';

import postgresConfigurations from '@/providers/configs/postgres.config';
// import mysqlConfigurations rom '@/providers/configs/mysql.config';

export class Provider {
	private static instance: Provider;

	public AppDataSource: DataSource;
	// public LogsDataSource: DataSource;

	private constructor() {
		this.AppDataSource = new DataSource(postgresConfigurations);
		// this.LogsDataSource = new DataSource(mysqlConfigurations);
	}

	public static getInstance(): Provider {
		if (!Provider.instance) {
			Provider.instance = new Provider();
		}
		return Provider.instance;
	}

	public async initializeAppDataSource(): Promise<void> {
		try {
			if (!this.AppDataSource.isInitialized) {
				await this.AppDataSource.initialize();
			}
			console.log('AppDataSource has been initialized!');
		} catch (error) {
			console.error('Error during AppDataSource initialization:', error);
		}
	}

	// public async initializeLogsDataSource(): Promise<void> {
	// 	try {
	// 		await this.LogsDataSource.initialize();
	// 		console.log('LogsDataSource has been initialized!');
	// 	} catch (error) {
	// 		console.error('Error during LogsDataSource initialization:', error);
	// 	}
	// }
}

export default Provider.getInstance().AppDataSource;
