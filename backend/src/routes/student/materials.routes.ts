import { Router } from 'express';

import { read } from '../../apps/student/materials.controller';

const router = Router();

router.get('/:courseId', read);

export default router;
