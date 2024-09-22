import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstracts/abstract.entity';
import { User } from './user.entity';
import { Enrollment } from './enrollment.entity';

// Students Entity
@Entity({ name: 'students' })
export class Student extends AbstractEntity {
	@Column({ type: 'varchar', length: 10, unique: true, nullable: true })
	studentID: string;

	@Column({ unique: true })
	uid: string;

	@ManyToOne(() => User, user => user.student)
	Users: User;

	@OneToMany(() => Enrollment, enrollment => enrollment.student)
	enrollments: Enrollment[];
}
