import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

import { generateTokens } from '../../utils/jwt';

export async function login(req: Request, res: Response) {
	let { email, password }: { email: string; password: string } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Invalid request!' });
	}

	email = email.toLowerCase();
	password = password.trim();

	const prisma = new PrismaClient();

	const user = await prisma.users.findUnique({
		where: {
			email,
		},
		include: {
			Credentials: {
				select: {
					id: true,
					password: true,
				},
			},
			Roles: {
				select: {
					id: true,
					type: true,
					level: true,
				},
			},
		},
	});

	if (!user) {
		return res.status(400).json({ message: 'Invalid email/password!' });
	}

	const isPasswordValid = bcrypt.compareSync(password, user?.Credentials?.password || '');

	if (!isPasswordValid) {
		return res.status(400).json({ message: 'Invalid email/password!' });
	}

	let details = null;
	// if role is student or teacher, get student or teacher details
	if (user.Roles.type === 'STUDENT') {
		details = await prisma.students.findUnique({
			where: {
				id: user.id,
			},
			select: {
				id: true,
				studentID: true,
			},
		});
	} else if (user.Roles.type === 'TEACHER') {
		details = await prisma.teachers.findUnique({
			where: {
				id: user.id,
			},
			select: {
				id: true,
				initial: true,
			},
		});
	}

	if (!details) {
		return res.status(400).json({ message: 'Invalid email/password!' });
	}

	const { accessToken, refreshToken } = await generateTokens({
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			school: user.school,
		},
		details: {
			id: details.id,
		},
		permissions: {
			id: user.Roles.id,
			type: user.Roles.type,
			level: user.Roles.level,
		},
	});

	return res.status(200).json({
		message: 'Login successful!',
		tokens: {
			accessToken,
			refreshToken,
		},
	});
}

export async function register(req: Request, res: Response) {
	let { email, password, type } = req.body;

	if (!email || !password || !type) {
		return res.status(400).json({ message: 'Invalid request!' });
	}

	type = type.toUpperCase();
	email = email.toLowerCase();
	password = password.trim();

	const prisma = new PrismaClient();

	const user = await prisma.users.findUnique({
		where: {
			email,
		},
		select: {
			email: true,
		},
	});

	if (user) {
		return res.status(400).json({ message: 'User already exists!' });
	}

	const hashedPassword = await bcrypt.hash(password, 14);

	const newUserData: Prisma.UsersCreateInput = {
		email,
		Credentials: {
			create: {
				password: hashedPassword,
			},
		},
		Roles: {
			create: {
				type: type,
			},
		},
	};

	return await prisma.users
		.create({
			data: newUserData,
			include: {
				Credentials: true,
				Roles: true,
			},
		})
		.then(user => {
			console.log(`'${user.email}' has been registered as '${user.Roles.type}'`);
		})
		.catch(err => {
			console.log(err);
			return res.status(400).json({ message: 'Registration failed!' });
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

export async function deAuth(req: Request, res: Response) {
	console.log('user is trying to de-authenticate');

	// TODO: Add redis to store refresh tokens and invalidate them when user logs out

	return res.status(200).json({ message: 'Logout successful!' });
}
