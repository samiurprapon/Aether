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

	const decoded: any = await decodeToken(token, false);

	if (!decoded) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	res.locals.data = decoded;
	next();
}

export async function authorization(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(403).json({ message: 'Forbidden' });
	}

	const [type, token] = authorization.split(' ');

	if (type !== 'Bearer' || !token) {
		return res.status(403).json({ message: 'Forbidden' });
	}

	try {
		const decoded = await decodeToken(token, true);
		res.locals.data = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
}
