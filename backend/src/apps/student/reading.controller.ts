import { Request, Response } from 'express';

export async function read(_req: Request, res: Response) {
	return res.status(200).json({
		message: 'Read materials',
	});
}
