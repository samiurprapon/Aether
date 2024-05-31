import { DataSource } from 'typeorm';

export abstract class DataSourceFactory {
	abstract initialize(): Promise<void>;
	abstract destroy(): Promise<void>;
	abstract getDataSource(): DataSource;
}
