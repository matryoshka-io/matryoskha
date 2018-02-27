const router = require('express').Router();
const controllers = require('../controllers');
const gateway = require('../middleware/gateway');

// Get the home page
router.get('/', controllers.home.GET);

// Get posts top posts for a given subreddit.
router.get('/sub/:subName', controllers.subreddit.GET);
// Get a post.
router.get('/post/:postId', controllers.post.GET);
// Get a comment.
router.get('/comment/:commentId', controllers.comment.GET);

// You must be authed to use the below API routes.
router.use(gateway);

// Create a subreddit.
router.post('/sub', controllers.subreddit.POST.subreddit);
// Create a post in a subreddit.
router.post('/sub/:subName', controllers.subreddit.POST.post);
// Edit a subreddit's details.
router.put('/sub/:subName', controllers.subreddit.PUT);

// Edit a post.
router.put('/post/:postId', controllers.post.PUT);
// Delete a post.
router.delete('/post/:postId', controllers.post.DELETE);
// Comment on a post in a subreddit.
router.post('/post/:postId', controllers.post.POST);

// Edit a comment.
router.put('/comment/:commentId', controllers.comment.PUT);
// Delete a comment.
router.delete('/comment/:commentId', controllers.comment.DELETE);
// Comment on a comment.
router.post('/comment/:commentId', controllers.comment.POST);

// Add a vote.
router.post('/vote/:postId', controllers.vote.POST);
// Remove a vote.
router.delete('/vote/:postId', controllers.vote.DELETE);

// Get a user's karma and date joined, basically.
router.get('/user/:username', controllers.user.profile.GET);
router.get('/user/:username/posts', controllers.user.posts.GET);
router.get('/user/:username/comments', controllers.user.comments.GET);
router.get('/user/:username/subreddits', controllers.user.subreddits.GET);

module.exports = router;
