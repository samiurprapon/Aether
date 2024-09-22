import { Column, Entity, OneToOne, OneToMany, ManyToOne, Unique } from 'typeorm';

import { AbstractEntity } from '@//providers/postgres/abstracts/abstract.entity';
import { SEMESTER } from '../enums/semester.enum';
import { Material } from './material.entity';
import { Teacher } from './teacher.entity';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'courses' })
@Unique(['id', 'instructor'])
@Unique(['courseCode', 'section', 'semester', 'year'])
export class Course extends AbstractEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	status: string;

	@Column({ type: 'varchar', length: 10 })
	courseCode: string;

	@Column({ type: 'varchar', length: 10, nullable: true })
	section: string;

	@Column({ type: 'varchar', length: 10, unique: true, nullable: true })
	enrollCode: string;

	@Column({ type: 'enum', enum: SEMESTER, default: SEMESTER.SPRING, nullable: true })
	semester: SEMESTER;

	@Column({ type: 'year', default: 2024, nullable: true })
	year: number;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean;

	@Column({ nullable: true })
	instructor: string;

	@ManyToOne(() => Teacher, teacher => teacher.courses)
	teacher: Teacher;

	@OneToMany(() => Enrollment, enrollment => enrollment.course)
	enrollments: Enrollment[];

	@OneToOne(() => Material, materials => materials.course)
	material: Material;
}
