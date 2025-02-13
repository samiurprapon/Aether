import { Router } from 'express';

export abstract class AbstractRouter {
	protected abstract initializeRoutes(): void;
	abstract getRoutes(): Router;
}
