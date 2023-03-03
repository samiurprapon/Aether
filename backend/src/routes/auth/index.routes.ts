import { Router } from 'express';

import { login, register, deAuth } from '../../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/signup', register);
router.get('/logout', deAuth);

export default router;
