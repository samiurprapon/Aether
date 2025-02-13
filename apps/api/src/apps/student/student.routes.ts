import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { StudentController } from '@/apps/student/student.controller';

import { authorization } from '@/apps/authentication/middlewares/auth.middleware';

export class StudentRouter extends AbstractRouter {
	private static instance: StudentRouter;

	public router: Router;
	public controller: StudentController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = StudentController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new StudentRouter();
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

export default StudentRouter.getInstance().getRoutes();
