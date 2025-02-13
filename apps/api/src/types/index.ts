export type User = {
	id: string;
	email: string;
	name: string | null;
	school: string | null;
};

export type StudentOrTeacher = {
	id: string;
};

export type Role = {
	id: string;
	type: string;
	level: string;
};

export type TokenData = {
	user: User;
	details: StudentOrTeacher;
	permissions: Role;
	iat?: number;
	exp?: number;
};
