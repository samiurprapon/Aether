import { Router } from 'express';

import { enrollCourse, dropCourse, getCourses } from '../../controllers/student/course.controller';

const router = Router();

router.get('/', getCourses);
router.post('/', enrollCourse);
router.delete('/', dropCourse);

export default router;
