import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export class MaterialController {
	private static instance: MaterialController;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new MaterialController();
		}

		return this.instance;
	}
	async create(_req: Request, res: Response, next: NextFunction) {
		// To be implemented

		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('MaterialController::create: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async read(_req: Request, res: Response, next: NextFunction) {
		// To be implemented

		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('MaterialController::read: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
