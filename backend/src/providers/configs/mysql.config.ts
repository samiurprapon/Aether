import 'reflect-metadata';
// import fs from 'fs';
import { DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { config } from '@/configs';

// entities
import { ServerLog } from '@/providers/mysql/entities/serverLog.entity';

// migrations
import { CreateServerLog1717194809707 } from '@/providers/mysql/migrations/1717194809707-CreateServerLog';

const dataSourceConfig: DataSourceOptions = {
	type: 'mysql',
	connectorPackage: 'mysql2',
	host: config.LOGS_DB_HOST,
	port: config.LOGS_DB_PORT,
	username: config.LOGS_DB_USER,
	password: config.LOGS_DB_PASSWORD,
	database: config.LOGS_DB_NAME,
	migrationsRun: false,
	ssl: false,

	cache: getCache(config.NODE_ENV),

	synchronize: false,
	logging: ['error', 'warn'],
	entities: [ServerLog],
	migrations: [CreateServerLog1717194809707],
};

function getCache(env: string): BaseDataSourceOptions['cache'] {
	if (env === 'development') {
		return {
			type: 'ioredis',
			options: {
				host: config.REDIS_HOST,
				port: config.REDIS_PORT,
			},
		};
	} else {
		return false;
	}
}

export default dataSourceConfig;
