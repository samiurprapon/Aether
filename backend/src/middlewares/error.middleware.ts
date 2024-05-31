import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/libs/logger';
import { CustomHttpException } from '@/exceptions/CustomHttpException';

export const NotFoundMiddleware = async (_req: Request, _res: Response, next: NextFunction) => {
	const error: HttpException = new HttpException(404, 'Not found');

	return next(error);
};

export const ErrorMiddleware = async (
	error: HttpException | CustomHttpException | Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
) => {
	try {
		const status: number = (error as HttpException).status || 500;
		const message: string = error.message || 'Something went wrong';

		logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

		if (error instanceof CustomHttpException) {
			return res.status(status).json({
				message: message,
				...(error.custom as object),
			});
		}

		return res.status(status).json({
			message: message,
		});
	} catch (error: unknown) {
		console.error('Error middleware : ', error);

		return res.status(500).json({
			message: (error as Error).message,
		});
	}
};
