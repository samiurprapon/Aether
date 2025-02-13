import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	public updatedAt: Date;

	@DeleteDateColumn()
	public deletedAt?: Date;
}
