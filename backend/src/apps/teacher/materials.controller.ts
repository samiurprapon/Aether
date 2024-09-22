import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function create(req: Request, res: Response) {
	const { courseId, isPublic, title, type }: { courseId: string; isPublic: boolean; title: string; type: 'pdf' | 'docs' } = req.body;

	if (!req.file) {
		return res.status(400).json({
			message: 'No file uploaded',
		});
	}

	const material: Prisma.CourseMaterialsCreateInput = {
		isPublic: isPublic || false,
		title: !title ? req.file.originalname : title,
		type: type || 'pdf',
		Courses: {
			connect: {
				id: courseId,
			},
		},
	};

	return await prisma.courseMaterials
		.create({
			data: material,
		})
		.then(data => {
			return res.status(200).json({
				message: 'Material created successfully',
				data,
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
				Courses: {
					id: courseId,
					instructor: details.id,
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
