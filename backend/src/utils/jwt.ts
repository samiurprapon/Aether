import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import { User, StudentOrTeacher, Role, TokenData } from '../types';

const secretAccess: string = process.env.ACCESS_TOKEN_SECRET || 'somemoresecret';
const secretRefresh: string = process.env.REFRESH_TOKEN_SECRET || 'somemoresecret';

export async function generateTokens({ user, details, permissions }: { user: User; details: StudentOrTeacher; permissions: Role }) {
	const accessToken = sign({ user, details, permissions }, secretAccess, {
		algorithm: 'HS512',
		expiresIn: '60m',
	});

	const refreshToken = sign({ user, details, permissions }, secretRefresh, {
		algorithm: 'HS512',
		expiresIn: '7d',
	});

	return { accessToken, refreshToken };
}

export async function decodeToken(token: string, refresh: boolean) {
	return verify(token, refresh ? secretRefresh : secretAccess, (err, decoded) => {
		if (err) {
			return null;
		}

		return decoded;
	});
}

export async function generateAccessToken(data: TokenData) {
	if (data) {
		delete data['iat'];
		delete data['exp'];
	}
	// console.log("Generate Access Token: starts");

	return sign({ ...data }, secretAccess, {
		expiresIn: '15m',
	});
}
