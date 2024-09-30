import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export class CourseController {
	private static instance: CourseController;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new CourseController();
		}

		return this.instance;
	}

	async getCourses(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::login: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async enrollCourse(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::login: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async dropCourse(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::login: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
