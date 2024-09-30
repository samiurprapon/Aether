import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { AuthController } from '@/apps/authentication/auth.controller';
import { validation as userValidation } from '@/apps/authentication/middlewares/auth.middleware';

export class AuthRouter extends AbstractRouter {
	private static instance: AuthRouter;

	public router: Router;
	public controller: AuthController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = AuthController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new AuthRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.post('/login', this.controller.login);
		this.router.post('/register', this.controller.register);

		this.router.post('/refresh', userValidation, this.controller.refresh);
		this.router.post('/logout', userValidation, this.controller.deAuth);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export default AuthRouter.getInstance().getRoutes();
