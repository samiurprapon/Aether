import { Router } from 'express';

import { create, getCourses, update, setArchive, remove } from '../../controllers/teacher/course.controller';

const router = Router();

router.post('/', create);
router.put('/', update);
router.get('/', getCourses);
router.patch('/', setArchive);
router.delete('/', remove);

export default router;
