// import { Request, Response } from 'express';
import compression from 'compression';

export default () => compression({ level: -1, memLevel: 8 });
