const router = require('express').Router();
const controllers = require('../controllers');

router.post('/login', controllers.auth.POST.login);
router.post('/logout', controllers.auth.POST.logout);
router.post('/register', controllers.auth.POST.register);

module.exports = router;
