import { Router } from 'express';
import { AbstractRouter } from '@/abstracts/abstract.router';

import VersionOneRouter from '@/routes/v1/index';

export class MainRouter extends AbstractRouter {
	private static instance: MainRouter;
	public router: Router;

	private constructor() {
		super();
		this.router = Router();
		this.initializeRoutes();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new MainRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.use('/v1', VersionOneRouter); // v1.x.x routes
	}

	public getRoutes() {
		return this.router;
	}
}

export default MainRouter.getInstance().getRoutes();

// test
