import { Column, Entity, OneToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../abstracts/abstract.entity';
import { Course } from './course.entity';
import { Reading } from './reading.entity';

// CourseMaterials Entity
@Entity({ name: 'materials' })
export class Material extends AbstractEntity {
	@Column({ type: 'varchar', length: 255 })
	title: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	type: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	url: string;

	@Column({ type: 'boolean', default: false })
	isPublic: boolean;

	@Column({ unique: true })
	cid: string;

	@OneToOne(() => Course, course => course.material)
	course: Course;

	@OneToMany(() => Reading, session => session.material)
	sessions: Reading[];
}
