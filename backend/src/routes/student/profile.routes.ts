import { Router } from 'express';

import { getProfile, updateProfile } from '../../controllers/student/profile.controller';

const router = Router();

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
