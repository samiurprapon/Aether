export class UserRegisterDto {
	email: string;
	password: string;
	type: 'student' | 'teacher';
}
