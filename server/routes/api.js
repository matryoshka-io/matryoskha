const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.home.GET);

router.post('/sub', controllers.subreddit.POST);
router.get('/sub/:subId', controllers.subreddit.GET);

module.exports = router;
