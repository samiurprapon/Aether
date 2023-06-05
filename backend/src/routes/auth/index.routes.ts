import { Router } from 'express';

import { login, register, refresh, deAuth } from '../../controllers/auth/auth.controller';
import { authorization } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/signup', register);
router.post('/refresh', authorization, refresh);
router.post('/logout', deAuth);

export default router;
