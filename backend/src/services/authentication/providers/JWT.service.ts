import { randomUUID as uuidV4 } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { SignOptions, TokenExpiredError, sign, verify } from 'jsonwebtoken';

import { config } from '@/configs';
import { ITokenPayload } from '@/services/authentication/interfaces/ITokenPayload';
import { HttpException } from '@/exceptions/HttpException';

export class JwtService {
	private static instance: JwtService;

	private constructor() {}

	static getInstance(): JwtService {
		if (!this.instance) {
			this.instance = new JwtService();
		}
		return this.instance;
	}

	public createAccessToken(payload: ITokenPayload, session: string, audience?: string) {
		const options: SignOptions = {
			expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES,
			subject: payload.id,
			issuer: config.JWT_ISSUER,
			audience: audience,
			jwtid: session,
		};

		return sign(
			{
				user: payload,
			},
			config.JWT_ACCESS_TOKEN_SECRET,
			options,
		);
	}

	public createRefreshToken(payload: ITokenPayload, session: string, audience?: string) {
		const options: SignOptions = {
			expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES,
			subject: payload.id,
			issuer: config.JWT_ISSUER,
			jwtid: session,
			audience: audience,
		};

		const secret = config.JWT_REFRESH_TOKEN_SECRET;

		return sign(
			{
				user: payload,
			},
			secret,
			options,
		);
	}

	public createTokenPair(payload: ITokenPayload) {
		const session: string = uuidV4().replace(/-/g, '').toLowerCase();

		const access: string = this.createAccessToken(payload, session);
		const refresh: string = this.createRefreshToken(payload, session);

		return { access, refresh };
	}

	public validateToken<T>(token: string, isRefreshToken: boolean = false): T {
		const secret = isRefreshToken ? config.JWT_REFRESH_TOKEN_SECRET : config.JWT_ACCESS_TOKEN_SECRET;

		try {
			const decoded = verify(token, secret) as T;
			return decoded;
		} catch (err) {
			if (err instanceof TokenExpiredError) {
				throw new HttpException(StatusCodes.UNAUTHORIZED);
			}

			throw new HttpException(StatusCodes.FORBIDDEN);
		}
	}
}

export default JwtService.getInstance();
