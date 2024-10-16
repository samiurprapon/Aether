import { StatusCodes } from 'http-status-codes';

import AppDataProvider from '@/providers/postgres/Provider';
import BaseRepository from '@/providers/postgres/repositories/base.repository';
import Credential from '@/providers/postgres/entities/credential.entity';
import Student from '@/providers/postgres/entities/student.entity';
import Teacher from '@/providers/postgres/entities/teacher.entity';
import User from '@/providers/postgres/entities/user.entity';

import { JoseService } from '@/services/authentication/providers/Jose.service';

import { HttpException } from '@/exceptions/HttpException';
import { UserLoginDto } from '@/apps/authentication/dtos/user-login.dto';
import { UserRegisterDto } from '@/apps/authentication/dtos/user-register.dto';

export class AuthService {
	private static instance: AuthService;

	private credentialRepository: BaseRepository<Credential>;
	private userRepository: BaseRepository<User>;
	private studentRepository: BaseRepository<Student>;
	private teacherRepository: BaseRepository<Teacher>;

	private encryptedService: JoseService;

	private constructor() {
		this.credentialRepository = BaseRepository.getInstance<Credential>(Credential);
		this.userRepository = BaseRepository.getInstance<User>(User);
		this.studentRepository = BaseRepository.getInstance<Student>(Student);
		this.teacherRepository = BaseRepository.getInstance<Teacher>(Teacher);

		this.encryptedService = JoseService.getInstance();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new AuthService();
		}

		return this.instance;
	}

	async login({ email, password }: UserLoginDto) {
		const user = await this.userRepository.findOne(
			{ email: email.toLowerCase() },
			{
				id: true,
				isBan: true,
				credential: {
					password: true,
				},
				credentialId: true,
			},
			{
				credential: true,
			},
		);

		if (!user) {
			throw new HttpException(StatusCodes.BAD_REQUEST);
		}

		if (user.isBan) {
			throw new HttpException(StatusCodes.FORBIDDEN);
		}

		const isPasswordMatch = user.credential.comparePassword(password);

		if (!isPasswordMatch) {
			throw new HttpException(StatusCodes.UNAUTHORIZED);
		}

		// Todo: Implement token payload
		const { accessToken, refreshToken } = await this.encryptedService.generateTokenPair({ id: user.id });

		return { accessToken, refreshToken };
	}

	async register({ email, password, type }: UserRegisterDto) {
		email = email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? email.trim().toLocaleLowerCase() : '';
		password = password && password.length > 5 ? password : '';

		if (!email || !password) {
			throw new HttpException(StatusCodes.BAD_REQUEST);
		}

		const runner = AppDataProvider.createQueryRunner();
		await runner.connect();
		await runner.startTransaction();

		try {
			const alreadyUser = await this.userRepository.findOne([{ email: email }], undefined, undefined, runner);

			if (alreadyUser) {
				throw new HttpException(StatusCodes.CONFLICT);
			}

			const credential = await this.credentialRepository.create(
				{
					password: password,
				},
				runner,
			);

			const user = await this.userRepository.create(
				{
					email: email,
					credentialId: credential.id,
				},
				runner,
			);

			if (type === 'STUDENT') {
				await this.studentRepository.create(
					{
						userId: user.id,
					},
					runner,
				);
			} else if (type === 'TEACHER') {
				await this.teacherRepository.create(
					{
						userId: user.id,
					},
					runner,
				);
			} else {
				throw new HttpException(StatusCodes.NOT_ACCEPTABLE);
			}

			// ToDo: Implement role verification email
			// this.mailService.sendVerificationEmail(newUser.email);

			// ToDo: Add email to a GuestRemoveQueue to remove after 24 hours if not verified
			// this.queueService.addGuestRemoveQueue(user);

			await runner.commitTransaction();

			return {
				message: 'User registered successfully',
			};
		} catch (error) {
			await runner.rollbackTransaction();
			throw error;
		} finally {
			await runner.release();
		}
	}
}

export default AuthService.getInstance();
