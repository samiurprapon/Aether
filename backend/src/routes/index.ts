import { Router } from 'express';

import authRoutes from './auth/index.routes';
import studentRoutes from './student/index';
import teacherRoutes from './teacher/index';

const router = Router();

router.use('/auth', authRoutes);
router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);

export default router;
