import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function read(req: Request, res: Response) {
	const { courseId } = req.params;
	const { details } = res.locals.data;

	if (!courseId) {
		return res.status(400).json({
			message: 'No course found!',
		});
	}

	return await prisma.courseMaterials
		.findMany({
			where: {
				isPublic: true,
				Courses: {
					id: courseId,

					CourseEnrollments: {
						some: {
							sid: details.id,
							cid: courseId,
							isDropped: false,
						},
					},
				},
			},
			include: {
				Courses: true,
			},
		})
		.then(data => {
			return res.status(200).json({
				message: 'Materials fetched successfully',
				couses: data,
			});
		})
		.catch(err => {
			return res.status(400).json({
				message: err.message,
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
