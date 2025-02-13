// import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export class StudentController {
	private static instance: StudentController;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new StudentController();
		}

		return this.instance;
	}

	async getProfile(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('StudentController::read: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async updateProfile(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('StudentController::read: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
