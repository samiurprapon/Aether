import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstracts/abstract.entity';
import { User } from './user.entity';
import { Enrollment } from './enrollment.entity';
import { Reading } from './reading.entity';

// Students Entity
@Entity({ name: 'students' })
export class Student extends AbstractEntity {
	@Column({ type: 'varchar', length: 10, unique: true, nullable: true })
	studentId: string;

	@Column({ unique: true })
	userId: string;

	constructor(props: Partial<Student>) {
		super();
		Object.assign(this, props);
	}

	@ManyToOne(() => User, user => user.student)
	Users: User;

	@OneToMany(() => Reading, session => session.student)
	sessions: Reading[];

	@OneToMany(() => Enrollment, enrollment => enrollment.student)
	enrollments: Enrollment[];
}
