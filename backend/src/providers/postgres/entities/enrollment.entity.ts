import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { AbstractEntity } from '../abstracts/abstract.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

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

	@ManyToOne(() => Course, course => course.enrollments)
	course: Course;

	@ManyToOne(() => Student, student => student.enrollments)
	student: Student;
}
