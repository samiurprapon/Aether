import { Router } from 'express';

import { read } from '../../controllers/student/materials.controller';

import { fileUpload } from '../../middlewares/file.middleware';

const router = Router();

router.get('/:courseId' read);

export default router;
