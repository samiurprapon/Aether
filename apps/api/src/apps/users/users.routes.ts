import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { UserController } from '@/apps/users/users.controller';

import { authorization } from '@/apps/authentication/middlewares/auth.middleware';

export class UserRouter extends AbstractRouter {
	private static instance: UserRouter;

	public router: Router;
	public controller: UserController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = UserController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new UserRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.get('/', authorization, this.controller.getProfile);
		this.router.post('/', authorization, this.controller.updateProfile);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export default UserRouter.getInstance().getRoutes();
