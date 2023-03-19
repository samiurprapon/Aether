import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

export async function read(req: Request, res: Response) {
	return res.status(200).json({
		message: 'Read materials',
	});
}
