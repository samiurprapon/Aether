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
		lock?:
			| 'pessimistic_read'
			| 'pessimistic_write'
			| 'dirty_read'
			| 'pessimistic_partial_write'
			| 'pessimistic_write_or_fail'
			| 'for_no_key_update'
			| 'for_key_share',
	): Promise<T | null> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.findOne({
			relations: relations,
			select: select,
			where: where,
			transaction: runner ? true : false,
			lock: lock ? { mode: lock } : undefined,
		});
	}

	async findOneOrFail(
		where: FindOptionsWhere<T>,
		select?: FindOptionsSelect<T>,
		relations?: FindOptionsRelations<T>,
		runner?: QueryRunner,
	) {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.findOneOrFail({
			select: select,
			where: where,
			relations: relations,
		});
	}

	async findAll(
		options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
		selection?: FindOptionsSelect<T>,
		relations?: FindOptionsRelations<T>,
		order?: FindOptionsOrder<T>,
		take?: number,
		page?: number,
		runner?: QueryRunner,
		cache?:
			| number
			| {
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
		lock:
			| 'pessimistic_read'
			| 'pessimistic_write'
			| 'dirty_read'
			| 'pessimistic_partial_write'
			| 'pessimistic_write_or_fail'
			| 'for_no_key_update'
			| 'for_key_share' = 'pessimistic_write',
		cacheId?: string,
	): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;
		await connection
			.createQueryBuilder()
			.useTransaction(runner ? true : false)
			.setLock(lock)
			.update(this.repository.target)
			.set(updateSet)
			.where(where)
			.execute();

		if (connection.manager.connection.queryResultCache) {
			await connection.manager.connection.queryResultCache.remove([cacheId ?? this.repository.metadata.targetName]);
		}
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
		t: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[] | T | T[],
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

	async remove(where: FindOptionsWhere<T>, runner?: QueryRunner, cacheId?: string): Promise<void> {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		await connection.softDelete(where);

		// ToDo: invalidate cache from typeorm
		if (connection.manager.connection.queryResultCache) {
			await connection.manager.connection.queryResultCache.remove([cacheId ?? this.repository.metadata.targetName]);
		}
	}

	async count(where: FindOptionsWhere<T>, runner?: QueryRunner) {
		const connection = runner ? runner.manager.getRepository(this.repository.target) : this.repository;

		return await connection.count({ where });
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
