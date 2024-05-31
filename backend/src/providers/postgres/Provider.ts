import { DataSource } from 'typeorm';

import { DataSourceFactory } from '@/providers/abstracts/DataSourceFactory';
import postgresConfigurations from '@/providers/configs/postgres.config';
export class AppDataProvider extends DataSourceFactory {
	private static instance: AppDataProvider;
	private dataSource: DataSource;

	constructor() {
		super();
		this.dataSource = new DataSource(postgresConfigurations);
	}

	public static getInstance(): AppDataProvider {
		if (!this.instance) {
			this.instance = new AppDataProvider();
		}
		return this.instance;
	}

	public async initialize(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('AppDataProvider DataSource has been initialized!');
		} catch (error) {
			console.error('Error during AppDataProvider DataSource initialization:', error);
		}
	}

	public async destroy(): Promise<void> {
		try {
			await this.dataSource.destroy();
			console.log('AppDataProvider DataSource has been closed!');
		} catch (error) {
			console.error('Error during AppDataProvider DataSource closing:', error);
		}
	}

	public getDataSource(): DataSource {
		return this.dataSource;
	}
}

export default AppDataProvider.getInstance().getDataSource();
