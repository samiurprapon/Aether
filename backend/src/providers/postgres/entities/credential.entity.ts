import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import bcrypt from 'bcrypt';

import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';
import { User } from './user.entity';

@Entity({ name: 'credentials', database: process.env.POSTGRES_DB })
export class Credential extends AbstractEntity {
	@Column({ select: false })
	public password: string;

	@OneToOne(() => User, user => user.Credentials)
	@JoinColumn({ name: 'userId' })
	user?: User;

	constructor(props: Partial<Credential>) {
		super();
		Object.assign(this, props);
	}

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}

export default Credential;
