import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';

import { Material } from '@/providers/postgres/entities/material.entity';
import { Student } from '@/providers/postgres/entities/student.entity';

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
