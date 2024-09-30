import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function authorization(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(StatusCodes.UNAUTHORIZED).json();
	}

	if (authorization.startsWith('Bearer ')) {
		return res.status(StatusCodes.UNAUTHORIZED).json();
	}

	next();
}

export async function validation(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(StatusCodes.FORBIDDEN).json();
	}

	if (authorization.startsWith('Bearer ')) {
		return res.status(StatusCodes.FORBIDDEN).json();
	}

	next();
}
