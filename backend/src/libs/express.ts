import express, { json, urlencoded, Express as ExpressLib } from 'express';

import compression from '@/libs/compression';
import cors from '@/libs/cors';
import hpp from '@/libs/hpp';
import morgan from '@/libs/morgan';
import { stream } from '@/libs/logger';

import mainRoutes from '@/routes/MainRouter';
import { ErrorMiddleware, NotFoundMiddleware } from '@/middlewares/error.middleware';

class Express {
	private static instance: Express;
	private app: ExpressLib;

	private constructor() {
		this.app = express();
		this.setup();
	}

	public static getInstance(): Express {
		if (!Express.instance) {
			Express.instance = new Express();
		}
		return Express.instance;
	}

	private setup(): void {
		this.app.disable('x-powered-by');
		this.app.set('trust proxy', 1);
		this.app.set('x-timestamp', Date.now());

		this.app.use(json({ limit: '20mb' }));
		this.app.use(urlencoded({ extended: true }));

		this.app.use(compression());
		this.app.use(cors());
		this.app.use(hpp());
		this.app.use(morgan({ stream }));

		this.app.use('/api', mainRoutes);

		this.app.use(NotFoundMiddleware); // 404 middleware
		this.app.use(ErrorMiddleware); // Error middleware
	}

	public getApp() {
		return this.app;
	}
}

export default Express.getInstance().getApp();
