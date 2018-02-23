const router = require('express').Router();
const controllers = require('../controllers');
const gateway = require('../middleware/gateway');

// Will use the gateway to block routes that require authorization.

router.get('/', controllers.home.GET);

router.post('/sub', controllers.subreddit.POST.subreddit);
router.get('/sub/:subName', controllers.subreddit.GET); // Figure that out on the client. Id (the huge ObjectId thing, *shudders*) or Subreddit name/title.
router.post('/sub/:subName', controllers.subreddit.POST.post);
router.put('/sub/:subName', controllers.subreddit.PUT);

module.exports = router;
