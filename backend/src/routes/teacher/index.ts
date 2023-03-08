import { Router } from 'express';

import profileRoutes from './profile.routes';
import courseRoutes from './course.routes';

import { authentication } from '../../middlewares/auth.middleware';
import { allowTeacher } from '../../middlewares/role.middleware';

const router = Router();

router.use('/profile', authentication, allowTeacher, profileRoutes);
router.use('/course', authentication, allowTeacher, courseRoutes);

export default router;
