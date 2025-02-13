export class UserRegisterDto {
	email: string;
	password: string;
	type: 'STUDENT' | 'TEACHER' | 'AUTHORITY' | 'ADMIN';
}
