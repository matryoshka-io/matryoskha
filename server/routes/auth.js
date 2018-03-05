const router = require('express').Router();
const controllers = require('../controllers');
const tokenCheck = require('../middleware/').validateSession;

router.use(tokenCheck);

router.post('/login', controllers.auth.POST.login);
router.post('/logout', controllers.auth.POST.logout);
router.post('/signup', controllers.auth.POST.register);
router.post('/authenticate', controllers.auth.POST.authenticateToken);

module.exports = router;
