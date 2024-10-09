import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '@/providers/postgres/abstracts/abstract.entity';

import { Course } from '@/providers/postgres/entities/course.entity';
import { Student } from '@/providers/postgres/entities/student.entity';

// CourseEnrollments Entity
@Entity({ name: 'enrollments' })
@Unique(['courseId', 'studentId'])
export class Enrollment extends AbstractEntity {
	@Column({ type: 'boolean', default: false })
	isDropped: boolean;

	@Column({ nullable: true })
	courseId: string;

	@Column({ nullable: true })
	studentId: string;

	constructor(props: Partial<Enrollment>) {
		super();
		Object.assign(this, props);
	}

	@ManyToOne(() => Course, course => course.enrollments)
	course: Course;

	@ManyToOne(() => Student, student => student.enrollments)
	student: Student;
}
