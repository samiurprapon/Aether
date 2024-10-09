import { Column, Entity, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';

import Credential from '@/providers/postgres/entities/credential.entity';
import { Teacher } from '@/providers/postgres/entities/teacher.entity';
import { Role } from '@/providers/postgres/entities/role.entity';
import { Student } from '@/providers/postgres/entities/student.entity';

import { SEX } from '@/providers/postgres/enums/sex.enum';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	name: string;

	@Column({ type: 'varchar', length: 11, unique: true, nullable: false })
	phone: string;

	@Column({ type: 'enum', enum: SEX, default: SEX.MALE })
	sex: SEX;

	@Column({ type: 'varchar' })
	school?: string;

	@Column({ default: false })
	isBan: boolean;

	@Column({ unique: true })
	credentialId: string;

	constructor(props: Partial<Credential>) {
		super();
		Object.assign(this, props);
	}

	@OneToOne(() => Credential, credentials => credentials.user)
	@JoinColumn()
	credential: Credential;

	@OneToOne(() => Teacher, teacher => teacher.user)
	teachers?: Teacher;

	@OneToOne(() => Role, role => role.user)
	role?: Role;

	@OneToOne(() => Student, student => student.Users)
	student?: Student;

	@BeforeInsert()
	@BeforeUpdate()
	async emailToLowerCase() {
		this.email = this.email.toLowerCase().trim();
	}
}

export default User;
