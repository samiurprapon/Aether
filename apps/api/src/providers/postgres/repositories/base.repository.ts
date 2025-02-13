import { Repository, EntityTarget } from 'typeorm';

import DataSource from '@/providers/postgres/Provider';
import Entity from '@/providers/postgres/abstracts/abstract.entity';
import AbstractRepository from '@/abstracts/abstract.repository';

export class BaseRepository<T extends Entity> extends AbstractRepository<T> {
	protected static instances = new Map<string, BaseRepository<Entity>>();
	protected static repositories = new Map<string, Repository<Entity>>();

	protected constructor(entity: EntityTarget<T>) {
		const repositoryKey = entity.toString();

		if (!BaseRepository.repositories.has(repositoryKey)) {
			BaseRepository.repositories.set(repositoryKey, DataSource.getRepository(entity) as Repository<Entity>);
		}

		const repository = BaseRepository.repositories.get(repositoryKey);

		if (!repository) {
			throw new Error(`Repository for ${repositoryKey} not found`);
		}

		super(repository as Repository<T>);
	}

	static getInstance<E extends Entity>(entity: EntityTarget<E>): BaseRepository<E> {
		const key = entity.toString();

		if (!this.instances.has(key)) {
			this.instances.set(key, new BaseRepository<E>(entity) as BaseRepository<Entity>);
		}

		const instance = this.instances.get(key);
		if (!instance) {
			throw new Error(`Instance for ${key} not found`);
		}

		return instance as BaseRepository<E>;
	}
}

export default BaseRepository;
