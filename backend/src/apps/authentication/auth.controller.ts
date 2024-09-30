// import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export class AuthController {
	private static instance: AuthController;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new AuthController();
		}

		return this.instance;
	}

	async login(req: Request, res: Response, next: NextFunction) {
		let { email, password }: { email: string; password: string } = req.body;

		if (!email || !password) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request!' });
		}

		email = email.toLowerCase();
		password = password.trim();

		// To be implemented

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

	async register(req: Request, res: Response, next: NextFunction) {
		let { email, password, type }: { email: string; password: string; type: string } = req.body;

		if (!email || !password || !type) {
			return res.status(StatusCodes.NOT_IMPLEMENTED);
		}

		email = email.toLowerCase();
		password = password.trim();
		type = type.toUpperCase();

		if (!['STUDENT', 'TEACHER', 'AUTHORITY', 'ADMIN'].includes(type)) {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		}

		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::register: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async deAuth(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::deAuth: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async refresh(_req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(StatusCodes.NOT_IMPLEMENTED).json();
		} catch (error: unknown) {
			console.error('AuthController::deAuth: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
