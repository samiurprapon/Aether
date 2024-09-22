import { Router } from 'express';

import { getProfile, updateProfile } from '../../apps/teacher/profile.controller';

const router = Router();

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
