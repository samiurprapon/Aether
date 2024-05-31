import { DataSource } from 'typeorm';

import { DataSourceFactory } from '@/providers/abstracts/DataSourceFactory';
import mysqlConfigurations from '@/providers/configs/mysql.config';

export class LogDataProvider extends DataSourceFactory {
	private static instance: LogDataProvider;
	private dataSource: DataSource;

	constructor() {
		super();
		this.dataSource = new DataSource(mysqlConfigurations);
	}

	public static getInstance(): LogDataProvider {
		if (!this.instance) {
			this.instance = new LogDataProvider();
		}
		return this.instance;
	}

	public async initialize(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('LogDataProvider DataSource has been initialized!');
		} catch (error) {
			console.error('Error during LogDataProvider DataSource initialization:', error);
		}
	}

	public async destroy(): Promise<void> {
		try {
			await this.dataSource.destroy();
			console.log('LogDataProvider DataSource has been closed!');
		} catch (error) {
			console.error('Error during LogDataProvider DataSource closing:', error);
		}
	}

	public getDataSource(): DataSource {
		return this.dataSource;
	}
}

export default LogDataProvider.getInstance().getDataSource();
