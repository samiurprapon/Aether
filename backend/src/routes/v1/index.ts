import { Router } from 'express';
import { AbstractRouter } from '@/abstracts/abstract.router';

import authRoutes from '@/apps/authentication/auth.routes';
import courseRoutes from '@/apps/courses/course.routes';
import materialsRoutes from '@/apps/materials/materials.routes';
import readingRoutes from '@/apps/reading/reading.routes';
import studentRoutes from '@/apps/student/student.routes';
import usersRoutes from '@/apps/users/users.routes';

export class VersionOneRouter extends AbstractRouter {
	private static instance: VersionOneRouter;
	public router: Router;

	private constructor() {
		super();
		this.router = Router();
		this.initializeRoutes();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new VersionOneRouter();
		}

		return this.instance;
	}

	protected initializeRoutes(): void {
		this.router.use('/auth', authRoutes);
		this.router.use('/courses', courseRoutes);
		this.router.use('/materials', materialsRoutes);
		this.router.use('/reading', readingRoutes);
		this.router.use('/student', studentRoutes);
		this.router.use('/users', usersRoutes);
	}

	public getRoutes() {
		return this.router;
	}
}

export default VersionOneRouter.getInstance().getRoutes();
