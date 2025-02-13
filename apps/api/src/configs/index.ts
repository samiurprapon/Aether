import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development'; // default to development [development, production, test]
const envFilePath = path.resolve(__dirname, `../../../.env.${env}.local`);

if (!envFilePath && env === 'development') {
	path.resolve(__dirname, `../../.env`);
} else if (!envFilePath) {
	throw new Error('Environment file not found');
}

// Load the .env file
const result = dotenv.config({ path: envFilePath });

/*
 * DO NOT REMOVE THIS CODE
 * This error check is important for database migration related task
 *
 */
if (result.error) {
	dotenv.config({
		path: path.resolve(__dirname, `../../.env.${env}.local`),
	});
}

export const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',

	// without / at the end
	CLIENT_URL: process.env.CLIENT_URL || '',

	APP_TITLE: process.env.APP_TITLE || '',
	APP_DESCRIPTION: process.env.APP_DESCRIPTION || '',

	APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000,
	APP_LOG_DIR: process.env.APP_LOG_DIR || '',

	JWT_ISSUER: process.env.JWT_ISSUER || 'localhost',

	JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || '',
	JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',

	JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || '',
	JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d',

	DB_HOST: process.env.POSTGRES_HOST || '',
	DB_PORT: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
	DB_USER: process.env.POSTGRES_USER || '',
	DB_PASSWORD: process.env.POSTGRES_PASSWORD || '',
	DB_NAME: process.env.POSTGRES_DB || '',

	LOGS_DB_HOST: process.env.MYSQL_HOST || '',
	LOGS_DB_PORT: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
	LOGS_DB_USER: process.env.MYSQL_USER || '',
	LOGS_DB_PASSWORD: process.env.MYSQL_PASSWORD || '',
	LOGS_DB_NAME: process.env.MYSQL_DB || '',

	// redis
	REDIS_HOST: process.env.REDIS_HOST || Object.freeze('127.0.0.1') || 'redis',
	REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379'),
	REDIS_USER: process.env.REDIS_USER || 'default',
	REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
};
