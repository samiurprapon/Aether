import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { ReadingController } from '@/apps/reading/reading.controller';

import { authorization } from '@/apps/authentication/middlewares/auth.middleware';

export class ReadingRouter extends AbstractRouter {
	private static instance: ReadingRouter;

	public router: Router;
	public controller: ReadingController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = ReadingController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new ReadingRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.post('/', authorization, this.controller.read);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export default ReadingRouter.getInstance().getRoutes();
