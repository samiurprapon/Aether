import { Column, Entity, OneToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@//providers/postgres/abstracts/abstract.entity';

import Credential from './credential.entity';
import { Teacher } from './teacher.entity';
import { Role } from './role.entity';
import { Student } from './student.entity';
import { Reading } from './reading.entity';

import { SEX } from '../enums/sex.enum';

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
	Credentials: Credential;

	@OneToOne(() => Teacher, teacher => teacher.user)
	teachers?: Teacher;

	@OneToOne(() => Role, role => role.user)
	role?: Role;

	@OneToOne(() => Student, student => student.Users)
	student?: Student;

	@OneToMany(() => Reading, session => session.user)
	sessions: Reading[];
}
