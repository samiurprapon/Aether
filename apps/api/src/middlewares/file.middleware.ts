import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { mkdirSync } from 'fs';

import { v1 as uuid } from 'uuid';

import multer, { diskStorage, FileFilterCallback } from 'multer';

const materialStorage = (imagePath: string) =>
	diskStorage({
		destination: (_req: Request, _file: Express.Multer.File, cb) => {
			const dir = join(__dirname, '../public', imagePath);

			mkdirSync(dir, { recursive: true }); // create directory if not exist

			cb(null, dir);
		},
		filename: (_req, file, cb) => {
			cb(null, uuid() + '-' + file.originalname.trim().toLowerCase());
		},
	});

const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
	if (
		file.mimetype === 'application/pdf' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
		file.mimetype === 'application/msword' ||
		file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
		file.mimetype === 'application/vnd.ms-powerpoint'
	) {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

export const fileUpload = (path: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		return multer({
			storage: materialStorage(path),
			limits: {
				fileSize: 1024 * 1024 * 5,
			},
			fileFilter: fileFilter,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}).single('material')(req, res, (err: any) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
				});
			}
			next();
		});
	};
};
