import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import JoseService from '@/services/authentication/providers/Jose.service';

export async function authorization(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(StatusCodes.UNAUTHORIZED).json();
	}

	const token = authorization.split(' ')[1];

	const data = await JoseService.decryptAndValidateToken(token);

	if (!data) {
		return res.status(StatusCodes.UNAUTHORIZED).json();
	}

	res.locals.payload = data;

	next();
}
