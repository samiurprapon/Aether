import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../abstracts/abstract.entity';
import { Material } from './material.entity';
import { Student } from './student.entity';

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
	studentId: string;

	@Column({ nullable: true })
	materialId: string;

	constructor(props: Partial<Reading>) {
		super();
		Object.assign(this, props);
	}

	@ManyToOne(() => Student, user => user.sessions)
	student: Student;

	@ManyToOne(() => Material, materials => materials.sessions)
	material: Material;
}
