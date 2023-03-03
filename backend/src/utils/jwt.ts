import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import { User, StudentOrTeacher, Role } from '../types';

const secretAccess: string = process.env.ACCESS_TOKEN_SECRET || 'somemoresecret';
const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET || 'somemoresecret';

export async function generateTokens({ user, details, permissions }: { user: User; details: StudentOrTeacher; permissions: Role }) {
	const accessToken = sign({ user, details, permissions }, secretAccess, {
		algorithm: 'RS256',
		expiresIn: '15m',
	});

	const refreshToken = sign({ user, details, permissions }, secretRefresh, {
		algorithm: 'RS256',
		expiresIn: '7d',
	});

	return { accessToken, refreshToken };
}

export async function decodeToken(token: string, refresh: boolean) {
	return verify(
		token,
		refresh ? secretRefresh : secretAccess,
		{
			algorithms: ['RS256'],
		},
		(err, decoded) => {
			if (err) {
				return null;
			}

			return decoded;
		},
	);
}
