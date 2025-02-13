import { AbstractEntity } from '@/providers/mysql/abstracts/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity('server_logs', { database: process.env.MYSQL_DB })
export class ServerLog extends AbstractEntity {
	@Column({ type: 'text' })
	message: string;

	@Column({ type: 'text' })
	server: string;

	@Column({ type: 'text' })
	url: string;

	constructor(props: Partial<ServerLog>) {
		super();
		Object.assign(this, props);
	}
}
