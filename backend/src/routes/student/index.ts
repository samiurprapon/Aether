import { Router } from 'express';

import profileRoutes from './profile.routes';
import courseRoutes from './course.routes';
import materialsRoutes from './materials.routes';

import { authentication } from '../../middlewares/auth.middleware';
import { allowStudent } from '../../middlewares/role.middleware';

const router = Router();

router.use('/profile', authentication, allowStudent, profileRoutes);
router.use('/course', authentication, allowStudent, courseRoutes);
router.use('/materials', authentication, allowStudent, materialsRoutes);

export default router;
