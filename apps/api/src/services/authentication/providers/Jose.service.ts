import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { importPKCS8, importSPKI, SignJWT, jwtVerify, CompactEncrypt, compactDecrypt, JWTPayload, KeyLike } from 'jose';

import { config } from '@/configs';
import { ITokenPayload } from '@/services/authentication/interfaces/ITokenPayload';

import TokenPayload from '@/services/authentication/classes/TokenPayload';

export class JoseService {
	private static instance: JoseService;

	private privateKey: KeyLike | null = null;
	private publicKey: KeyLike | null = null;

	private constructor() {}

	public static getInstance(): JoseService {
		if (!JoseService.instance) {
			JoseService.instance = new JoseService();
		}

		return JoseService.instance;
	}

	public async generateKeyPair(): Promise<void> {
		return new Promise((resolve, reject) => {
			crypto.generateKeyPair(
				'ec',
				{
					namedCurve: 'P-256',
					publicKeyEncoding: {
						type: 'spki',
						format: 'pem',
					},
					privateKeyEncoding: {
						type: 'pkcs8',
						format: 'pem',
					},
				},
				(err, publicKey, privateKey) => {
					if (err) {
						reject(err);
					} else {
						const certsDir = path.join(process.cwd(), 'certs');
						if (!fs.existsSync(certsDir)) {
							fs.mkdirSync(certsDir);
						}
						fs.writeFileSync(path.join(certsDir, 'public.pem'), publicKey);
						fs.writeFileSync(path.join(certsDir, 'private.pem'), privateKey);
						resolve();
					}
				},
			);
		});
	}

	public async initializeKeys(): Promise<void> {
		if (!this.privateKey || !this.publicKey) {
			const privateKeyPath = path.join(process.cwd(), 'certs', 'private.pem');
			const publicKeyPath = path.join(process.cwd(), 'certs', 'public.pem');

			if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
				await this.generateKeyPair();
			}

			const privateKeyFile = await fs.promises.readFile(privateKeyPath, 'utf8');
			this.privateKey = await importPKCS8(privateKeyFile, 'ES256');

			const publicKeyFile = await fs.promises.readFile(publicKeyPath, 'utf8');
			this.publicKey = await importSPKI(publicKeyFile, 'ES256');
		}
	}

	public async createTokenPayload<T extends ITokenPayload>(payload: T): Promise<ITokenPayload> {
		return new TokenPayload(payload.user);
	}

	public async generateTokenPair<T extends JWTPayload = ITokenPayload>(payload: T): Promise<{ accessToken: string; refreshToken: string }> {
		await this.initializeKeys();

		const accessToken = await this.encryptAndSignToken<T>(payload);
		const refreshToken = await this.encryptAndSignToken<T>(payload);

		return { accessToken, refreshToken };
	}

	private async encryptAndSignToken<T extends JWTPayload>(payload: T): Promise<string> {
		await this.initializeKeys();

		const options = {
			expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES,
		};

		const signedJWT = await new SignJWT(payload)
			.setProtectedHeader({ alg: 'ES256' })
			.setExpirationTime(options.expiresIn)
			.sign(this.privateKey!);

		const encryptedJWT = await new CompactEncrypt(new TextEncoder().encode(signedJWT))
			.setProtectedHeader({ alg: 'ECDH-ES+A256KW', enc: 'A256GCM' })
			.encrypt(this.publicKey!);

		return encryptedJWT;
	}

	public async decryptAndValidateToken<T extends JWTPayload>(token: string): Promise<T> {
		await this.initializeKeys();

		try {
			const { plaintext } = await compactDecrypt(token, this.privateKey!);
			const innerJWT = new TextDecoder().decode(plaintext);

			const { payload } = await jwtVerify(innerJWT, this.publicKey!);
			return payload as T;
		} catch (error: unknown) {
			console.error('Token decryption or validation failed:', (error as Error).message);
			throw new Error('Invalid token');
		}
	}
}

export default JoseService.getInstance();
