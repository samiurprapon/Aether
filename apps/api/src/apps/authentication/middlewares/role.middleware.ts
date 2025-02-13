import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function allowStudent(_req: Request, res: Response, next: NextFunction) {
	const { permissions } = res.locals.data;

	if (permissions.type !== 'STUDENT') {
		return res.status(StatusCodes.FORBIDDEN).json();
	}

	next();
}

export async function allowTeacher(_req: Request, res: Response, next: NextFunction) {
	const { permissions } = res.locals.data;

	if (permissions.type !== 'TEACHER') {
		return res.status(StatusCodes.FORBIDDEN).json();
	}

	next();
}
