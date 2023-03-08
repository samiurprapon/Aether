import { Router } from 'express';

import profileRoutes from './profile.routes';
import courseRoutes from './course.routes';

import { authentication } from '../../middlewares/auth.middleware';
import { allowStudent } from '../../middlewares/role.middleware';

const router = Router();

router.use('/profile', authentication, allowStudent, profileRoutes);
router.use('/course', authentication, allowStudent, courseRoutes);

export default router;
