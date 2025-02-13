import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { MaterialController } from '@/apps/materials/materials.controller';

import { authorization } from '@/apps/authentication/middlewares/auth.middleware';

export class MaterialRouter extends AbstractRouter {
	private static instance: MaterialRouter;

	public router: Router;
	public controller: MaterialController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = MaterialController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new MaterialRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.get('/', authorization, this.controller.read);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export default MaterialRouter.getInstance().getRoutes();
