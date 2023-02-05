const router = require('express').Router();

const courseRoute = require('./courseRoute');
const profileRoute = require('./profileRoute');

router.use('/profile', profileRoute);
router.use('/courses', courseRoute);

module.exports = router;
