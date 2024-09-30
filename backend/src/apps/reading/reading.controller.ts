// import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export class ReadingController {
	private static instance: ReadingController;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ReadingController();
		}

		return this.instance;
	}

	async read(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('ReadingController::read: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
