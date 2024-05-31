import { Request, Response, NextFunction } from 'express';

export async function allowStudent(_req: Request, res: Response, next: NextFunction) {
	const { permissions } = res.locals.data;

	if (permissions.type !== 'STUDENT') {
		return res.status(403).json({ message: 'Forbidden' });
	}

	next();
}

export async function allowTeacher(_req: Request, res: Response, next: NextFunction) {
	const { permissions } = res.locals.data;

	if (permissions.type !== 'TEACHER') {
		return res.status(403).json({ message: 'Forbidden' });
	}

	next();
}
