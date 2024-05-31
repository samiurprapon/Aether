import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import bcrypt from 'bcrypt';

import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';

@Entity({ name: 'credentials', database: process.env.POSTGRES_DB })
export class Credential extends AbstractEntity {
	@Column({ select: false })
	public password: string;

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
