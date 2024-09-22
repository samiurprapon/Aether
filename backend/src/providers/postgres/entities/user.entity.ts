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
	@Column({ type: 'varchar', length: 255, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	name: string;

	@Column({ type: 'varchar', length: 11, unique: true, nullable: true })
	phone: string;

	@Column({ type: 'enum', enum: SEX, default: SEX.MALE })
	sex: SEX;

	@Column({ type: 'varchar', length: 255, nullable: true })
	school: string;

	@Column({ type: 'boolean', default: false })
	isBan: boolean;

	@Column({ unique: true })
	cid: string;

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
