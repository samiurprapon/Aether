import { Request, Response } from 'express';

import { Prisma, PrismaClient } from '@prisma/client';

export async function getProfile(req: Request, res: Response) {
	const data = res.locals.data;

	const prisma = new PrismaClient();

	return await prisma.teachers
		.findUnique({
			where: {
				id: data.details.id,
			},
			select: {
				id: true,
				initial: true,

				Users: {
					select: {
						id: true,
						name: true,
						school: true,
						sex: true,
					},
				},
			},
		})
		.then(teacher => {
			return res.status(200).json({
				message: 'Teacher Profile fetched successfully!',
				profile: teacher,
			});
		})
		.catch(err => {
			console.log(err);

			return res.status(400).json({
				message: 'Teacher Profile could not be fetched!',
			});
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

export async function updateProfile(req: Request, res: Response) {
	const data = res.locals.data;

	const { name, initial, sex, school }: { name: string; initial: string; school: string; sex: 'MALE' | 'FEMALE' | 'OTHER' } = req.body;

	const teacher: Prisma.TeachersUpdateInput = {
		initial: initial,

		Users: {
			update: {
				name: name,
				sex: sex,
				school: school,
			},
		},
	};

	const prisma = new PrismaClient();

	return await prisma.teachers
		.update({
			where: {
				id: data.details.id,
			},
			data: teacher,
		})
		.then(() => {
			return res.status(200).json({
				message: 'Profile updated successfully!',
			});
		})
		.catch(err => {
			console.log(err);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
