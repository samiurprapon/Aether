import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../abstracts/abstract.entity';
import { User } from './user.entity';
import { Course } from './course.entity';

// Teachers Entity
@Entity({ name: 'teachers' })
export class Teacher extends AbstractEntity {
	@Column({ type: 'varchar', length: 10, unique: true, nullable: true })
	initial: string;

	@Column({ unique: true })
	userId: string;

	constructor(props: Partial<Teacher>) {
		super();
		Object.assign(this, props);
	}

	@ManyToOne(() => User, user => user.teachers)
	user: User;

	@OneToMany(() => Course, course => course.instructor)
	courses: Course[];
}
