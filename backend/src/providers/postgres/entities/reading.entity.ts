import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../abstracts/abstract.entity';
import { User } from './user.entity';
import { Material } from './material.entity';

// ReadingSessions Entity
@Entity({ name: 'readings' })
export class Reading extends AbstractEntity {
	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	startsAt: Date;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	endsAt: Date;

	@Column({ type: 'int', default: 0 })
	duration: number;

	@Column({ nullable: true })
	uid: string;

	@Column({ nullable: true })
	mid: string;

	@ManyToOne(() => User, user => user.sessions)
	user: User;

	@ManyToOne(() => Material, materials => materials.sessions)
	material: Material;
}
