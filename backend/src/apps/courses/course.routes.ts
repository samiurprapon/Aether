import { Router } from 'express';

import { AbstractRouter } from '@/abstracts/abstract.router';
import { CourseController } from '@/apps/courses/course.controller';

import { authorization } from '@/apps/authentication/middlewares/auth.middleware';

export class CourseRouter extends AbstractRouter {
	private static instance: CourseRouter;

	public router: Router;
	public controller: CourseController;

	private constructor() {
		super();
		this.router = Router();
		this.controller = CourseController.getInstance();

		this.initializeRoutes();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new CourseRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.get('/', authorization, this.controller.getCourses);
		this.router.post('/', authorization, this.controller.enrollCourse);

		this.router.delete('/:id', authorization, this.controller.dropCourse);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export default CourseRouter.getInstance().getRoutes();
