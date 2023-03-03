import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../utils/jwt';

export async function authentication(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const [type, token] = authorization.split(' ');

	if (type !== 'Bearer') {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = await decodeToken(token, false);
		res.locals.data = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}

export async function authorization(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const [type, token] = authorization.split(' ');

	if (type !== 'Bearer') {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = await decodeToken(token, true);
		res.locals.data = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	next();
}
