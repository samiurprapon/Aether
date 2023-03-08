import { Router } from 'express';

import { read } from '../../controllers/student/materials.controller';

const router = Router();

router.get('/:courseId', read);

export default router;
