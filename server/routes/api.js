const router = require('express').Router();
const controllers = require('../controllers');
const gateway = require('../middleware/gateway');

// Will use the gateway to block routes that require authorization.
// ^Scratch that, it will be logic within the GET controller.
router.get('/', controllers.home.GET);

// Create a subreddit.
router.post('/sub', controllers.subreddit.POST.subreddit);
// Get posts top posts for a given subreddit.
router.get('/sub/:subId', controllers.subreddit.GET);
// Create a post in a subreddit.
router.post('/sub/:subId', controllers.subreddit.POST.post);
// Edit a subreddit's details.
router.put('/sub/:subId', controllers.subreddit.PUT);

// Get a post.
router.get('/post/:postId', controllers.post.GET);
// Edit a post.
router.put('/post/:postId', controllers.post.PUT);
// Delete a post.
router.delete('/post/:postId', controllers.post.DELETE);
// Comment on a post in a subreddit.
router.post('/sub/:subId/post/:postId', controllers.post.POST);

// What about commenting on a comment?

module.exports = router;
