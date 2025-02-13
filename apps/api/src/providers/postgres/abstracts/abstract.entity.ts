import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
	@PrimaryColumn()
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@CreateDateColumn({ type: 'timestamptz' })
	public createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	public updatedAt: Date;

	@DeleteDateColumn()
	public deletedAt?: Date;
}

export default AbstractEntity;
