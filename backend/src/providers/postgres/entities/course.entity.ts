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
	@Column()
	name: string;

	@Column()
	status?: string;

	@Column({ type: 'varchar', length: 10 })
	courseCode: string;

	@Column()
	section: string;

	@Column({ nullable: true })
	enrollCode: string;

	@Column({ type: 'enum', enum: SEMESTER, default: SEMESTER.SPRING })
	semester: SEMESTER;

	@Column({
		type: 'smallint',
		default: new Date().getFullYear(),
	})
	year: number;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean;

	@ManyToOne(() => Teacher, teacher => teacher.courses)
	instructor: Teacher;

	@OneToMany(() => Enrollment, enrollment => enrollment.course)
	enrollments: Enrollment[];

	@OneToOne(() => Material, materials => materials.course)
	material: Material;
}
