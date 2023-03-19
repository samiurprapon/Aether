import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCourses(req: Request, res: Response) {
	const studentId: string = res.locals.data.details.id;

	return await prisma.courseEnrollments
		.findMany({
			where: {
				sid: studentId,
			},
			include: {
				Courses: true,
			},
		})
		.then(enrollments => {
			res.status(200).json({
				message: 'Courses fetched successfully!',
				courses: enrollments,
			});
		})
		.catch(err => {
			res.status(400).json({
				message: 'Error fetching courses!',
				error: err,
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

export async function enrollCourse(req: Request, res: Response) {
	const { enroll } = req.body;
	const studentId: string = res.locals.data.details.id;

	const course = await prisma.courses.findUnique({
		where: {
			enrollCode: enroll,
		},
		select: {
			id: true,
		},
	});

	if (!course) {
		return res.status(404).json({
			message: 'Course not found!',
		});
	}

	return await prisma.courseEnrollments
		.upsert({
			create: {
				sid: studentId,
				cid: course.id,
			},
			update: {
				isDropped: false,
			},
			where: {
				cid_sid: {
					cid: course.id,
					sid: studentId,
				},
			},
		})
		.then(result => {
			return res.status(200).json({
				message: 'Course enrolled successfully!',
				enrollId: result.id,
			});
		})
		.catch(err => {
			return res.status(400).json({
				message: 'Course enrollment failed!',
				error: err,
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

export async function dropCourse(req: Request, res: Response) {
	const studentId: string = res.locals.data.details.id;
	const { courseId, enrollId } = req.body;

	return await prisma.courseEnrollments
		.update({
			data: {
				isDropped: true,
			},
			where: {
				id: enrollId,
				cid_sid: {
					cid: courseId,
					sid: studentId,
				},
			},
		})
		.then(() => {
			return res.status(200).json({
				message: 'Course dropped successfully!',
			});
		})
		.catch(err => {
			return res.status(400).json({
				message: 'Course drop failed!',
				error: err,
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
