import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development'; // default to development [development, production, test]
const envFilePath = path.resolve(__dirname, `../../../.env.${env}.local`);

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
	JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES || '',

	JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || '',
	JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES || '',

	DB_USER: process.env.DB_USER || '',
	DB_PASSWORD: process.env.DB_PASSWORD || '',
	DB_NAME: process.env.DB_NAME || '',
	DB_HOST: process.env.DB_HOST || '',
	DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,

	LOGS_DB_USER: process.env.LOGS_DB_USER || '',
	LOGS_DB_PASSWORD: process.env.LOGS_DB_PASSWORD || '',
	LOGS_DB_NAME: process.env.LOGS_DB_NAME || '',
	LOGS_DB_HOST: process.env.LOGS_DB_HOST || '',
	LOGS_DB_PORT: process.env.LOGS_DB_PORT ? parseInt(process.env.LOGS_DB_PORT) : 3306,

	// redis
	REDIS_HOST: process.env.REDIS_HOST || 'redis',
	REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
};
