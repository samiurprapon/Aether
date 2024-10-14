// import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import service from '@/apps/authentication/auth.service';

import { HttpException } from '@/exceptions/HttpException';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

import { UserLoginDto } from '@/apps/authentication/dtos/user-login.dto';
import { UserRegisterDto } from '@/apps/authentication/dtos/user-register.dto';

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
		const { email, password }: UserLoginDto = req.body;

		try {
			const response = await service.login({ email, password });

			return res.status(StatusCodes.OK).json({
				...response,
			});
		} catch (error: unknown) {
			console.error('AuthController::login: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		const { email, password, type }: UserRegisterDto = req.body;

		try {
			if (!['STUDENT', 'TEACHER', 'AUTHORITY'].includes(type)) {
				throw new HttpException(StatusCodes.NOT_IMPLEMENTED);
			}

			const response = await service.register({ email, password, type });

			return res.status(StatusCodes.CREATED).json({
				...response,
			});
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
			console.error('AuthController::refresh: ', error);

			if (error instanceof HttpException || error instanceof CustomHttpException) {
				return next(error);
			}

			return next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error)?.message || 'Something went wrong!'));
		}
	}
}
