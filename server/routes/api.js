const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.home.GET);

router.post('/sub', controllers.subreddit.POST.subreddit);
router.get('/sub/:subName', controllers.subreddit.GET); // Figure that out on the client. Id (the huge ObjectId thing, *shudders*) or Subreddit name/title.
router.post('/sub/:subName', controllers.subreddit.POST.post);

module.exports = router;
