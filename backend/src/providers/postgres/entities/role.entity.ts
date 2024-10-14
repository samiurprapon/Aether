import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';

import { User } from '@/providers/postgres/entities/user.entity';
import { USER_ROLE } from '@/providers/postgres/enums/userRole.enum';
import { ROLE_LEVEL } from '@/providers/postgres/enums/level.enum';

// Roles Entity
@Entity({ name: 'roles' })
export class Role extends AbstractEntity {
	@Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.STUDENT })
	type: USER_ROLE;

	@Column({ type: 'enum', enum: ROLE_LEVEL, default: ROLE_LEVEL.ONE })
	level: ROLE_LEVEL;

	@Column({ unique: true })
	userId: string;

	constructor(props: Partial<Role>) {
		super();
		Object.assign(this, props);
	}

	@OneToOne(() => User, user => user.role)
	@JoinColumn()
	user: User;
}
