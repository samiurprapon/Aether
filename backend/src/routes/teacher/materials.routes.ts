import { Router } from 'express';

import { create, read } from '../../controllers/teacher/materials.controller';

import { fileUpload } from '../../middlewares/file.middleware';

const router = Router();

router.post('/', fileUpload('/materials'), create);
router.get('/:courseId', read);

export default router;
