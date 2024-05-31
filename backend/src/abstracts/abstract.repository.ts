import { DeepPartial, FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default abstract class AbstractRepository<T extends object> {
	protected repository: Repository<T>;

	constructor(repository: Repository<T>) {
		this.repository = repository;
	}

	async findOne(
		where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
		select?: FindOptionsSelect<T>,
		relations?: FindOptionsRelations<T>,
		runner?: QueryRunner,
	): Promise<T | null> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.findOne({
			relations: relations,
			select: select,
			where: where,
			transaction: runner ? true : false,
		});
	}

	async findAll(
		options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
		selection?: FindOptionsSelect<T>,
		relations?: FindOptionsRelations<T>,
		order?: FindOptionsOrder<T>,
		take?: number,
		page?: number,
		runner?: QueryRunner,
		cache?: {
			id: string;
			milliseconds: number;
		},
	): Promise<T[]> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.find({
			relations: relations,
			select: selection,
			where: options,
			take: take,
			skip: (take ?? 0) * ((page ?? 1) - 1),
			order: order,
			cache: cache,
		});
	}

	async findAndCount(
		where: FindOptionsWhere<T>,
		selection?: FindOptionsSelect<T>,
		order?: FindOptionsOrder<T>,
		take?: number,
		runner?: QueryRunner,
	): Promise<[T[], number]> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.findAndCount({
			select: selection,
			take: take,
			where: where,
			order: order,
		});
	}

	async findOneByOrFail(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], runner?: QueryRunner) {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.manager.findOneByOrFail(this.repository.target, where);
	}

	async update(
		where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
		updateSet: QueryDeepPartialEntity<T>,
		runner?: QueryRunner,
	): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;
		await connection
			.createQueryBuilder()
			.useTransaction(runner ? true : false)
			.setLock('pessimistic_write')
			.update(this.repository.target)
			.set(updateSet)
			.where(where)
			.execute();
	}

	async create(entity: DeepPartial<T>, runner?: QueryRunner): Promise<T> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		const object = connection.create(entity);
		await connection.save(object);

		return object;
	}

	async insert(entity: T | T[], runner?: QueryRunner): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.insert(entity);
	}

	async createOrUpdate(
		t: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
		options: {
			[P in keyof T]?: true;
		},
		runner?: QueryRunner,
	): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.upsert(t, {
			conflictPaths: options,
			skipUpdateIfNoValuesChanged: true,
		});
	}

	async delete(where: FindOptionsWhere<T>, runner?: QueryRunner): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.delete(where);
	}

	async remove(where: FindOptionsWhere<T>, runner?: QueryRunner): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.softDelete(where);
	}

	async count(where: FindOptionsWhere<T>, runner?: QueryRunner) {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.count(where);
	}

	async groupByCount(where: FindOptionsWhere<T>, groupBy: string, runner?: QueryRunner) {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection
			.createQueryBuilder()
			.select(`"${groupBy}"`, groupBy)
			.addSelect('COUNT(*)', 'total')
			.where(where)
			.groupBy(`"${groupBy}"`)
			.execute();
	}
}
