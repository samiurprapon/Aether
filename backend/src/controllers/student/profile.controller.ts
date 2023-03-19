import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProfile(req: Request, res: Response) {
	const data = res.locals.data;

	const student: Prisma.StudentsWhereUniqueInput = {
		id: data.details.id,
	};

	return await prisma.students
		.findUnique({
			where: student,
			select: {
				id: true,
				studentID: true,
				Users: {
					select: {
						id: true,
						name: true,
						email: true,
						school: true,
					},
				},
			},
		})
		.then(profile => {
			return res.status(200).json({
				message: 'Student Profile fetched successfully!',
				profile,
			});
		})
		.catch(err => {
			console.log(err);

			return res.status(500).json({
				message: 'Something went wrong!',
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

export async function updateProfile(req: Request, res: Response) {
	const data = res.locals.data;

	const { name, school, studentId, sex }: { name: string; school: string; studentId: string; sex: 'MALE' | 'FEMALE' | 'OTHER' } = req.body;

	const student: Prisma.StudentsWhereUniqueInput = {
		id: data.details.id,
	};

	const newStudent: Prisma.StudentsUpdateInput = {
		studentID: studentId,

		Users: {
			update: {
				name,
				school,
				sex,
			},
		},
	};

	return await prisma.students
		.update({
			where: student,
			data: newStudent,
		})
		.then(() => {
			return res.status(200).json({
				message: 'Profile updated successfully!',
			});
		})
		.catch(err => {
			return res.status(500).json({
				message: 'Profile updation failed!',
				error: err,
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
