import { Router } from 'express';

import profileRoutes from './profile.routes';
import courseRoutes from './course.routes';

const router = Router();

router.use('/profile', profileRoutes);
router.use('/course', courseRoutes);

export default router;
