const router = require('express').Router();
const controllers = require('../controllers');
const gateway = require('../middleware/gateway');

// Questions:
// 1) Can admins/owners of subreddits delete any and all material in that subreddit? (Posts and comments.)
// 2) Can you delete subreddits? And therefore all of the material within that subreddit, i.e. posts and comments.
// 3) Real-life Reddit only wipes the body of the Post/Comment that is "deleted", yet the post/comment is still there along with the,
//    timestamp. Perhaps they were lazy. The way I have it right now, any deleted comment cascades to the children,
//    and any deleted post cascades to the comments and their children.

// Issues:
// 1) As necessary I can switch between /r/subName and /r/subId,
//    and /u/username and /u/userId. The names/titles of posts
//    are not unique, however. Comments also do not have names/titles.
//    This is not an issue, however, since, in Reddit, you cannot see
//    posts without first going to the subreddit, and you cannot see
//    comments without first going to the post. Which means that the
//    front-end will already have all the necessary unique _id properties
//    to query whichever post or comment they want in "detail view."

// Get the home page
router.get('/', controllers.home.GET);

// Get posts top posts for a given subreddit.
router.get('/sub/:subId', controllers.subreddit.GET);
// Get a post.
router.get('/post/:postId', controllers.post.GET);
// Get a comment.
router.get('/comment/:commentId', controllers.comment.GET);

// You must be authed to use the below API routes.
router.use(gateway);

// Create a subreddit.
router.post('/sub', controllers.subreddit.POST.subreddit);
// Create a post in a subreddit.
router.post('/sub/:subId', controllers.subreddit.POST.post);
// Edit a subreddit's details.
router.put('/sub/:subId', controllers.subreddit.PUT);

// Edit a post.
router.put('/post/:postId', controllers.post.PUT);
// Delete a post.
router.delete('/post/:postId', controllers.post.DELETE);
// Comment on a post in a subreddit.
router.post('/sub/:subId/post/:postId', controllers.post.POST);

// Edit a comment.
router.put('/comment/:commentId', controllers.comment.PUT);
// Delete a comment.
router.delete('/comment/:commentId', controllers.comment.DELETE);
// Comment on a comment.
router.post('/comment/:commentId', controllers.comment.POST);

module.exports = router;
