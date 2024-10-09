import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';
import { User } from '@/providers/postgres/entities/user.entity';

@Entity({ name: 'credentials', database: process.env.POSTGRES_DB })
export class Credential extends AbstractEntity {
	@Column({ select: false })
	public password: string;

	@OneToOne(() => User, user => user.credential)
	user?: User;

	constructor(props: Partial<Credential>) {
		super();
		Object.assign(this, props);
	}

	@BeforeInsert()
	@BeforeUpdate()
	encryptPassword() {
		this.password = hashSync(this.password, 10);
	}

	public comparePassword(hash: string): boolean {
		return compareSync(hash, this.password);
	}
}

export default Credential;
