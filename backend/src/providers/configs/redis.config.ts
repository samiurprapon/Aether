import dotenv from 'dotenv';

dotenv.config();

const REDIS_LOCAL_HOST: string = Object.freeze('127.0.0.1') || 'redis';

export const REDIS_HOST: string = process.env.REDIS_HOST || REDIS_LOCAL_HOST;
export const REDIS_USER: string = process.env.REDIS_USER || '';
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || '';
export const REDIS_PORT: number = parseInt(process.env.REDIS_PORT || '6379');

export const REDIS_URI: string = process.env.REDIS_URI || '';
