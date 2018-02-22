const router = require('express').Router();

const db = require('../database');
const models = require('../models');

const matryoksha = function (post, callback, depth = 0) {
  models.Post.find({ type: 'Comment', parent: post._id }).then(function (comments) {
    post = { comments };
    for (const comment of post.comments) {
      matryoksha(comment, callback, depth + 1);
    }
    if (depth === 0) {
      callback(post);
    }
  });
};

router.get('/', function (req, res) {
  models.Post.find({ type: { $not: /Comment/ }})
    .populate('subreddit')
    .populate('author')
    .populate('link')
    .then(function (posts) {
      const promises = [];
      for (const post of posts) {
        promises.push(models.Vote.find({ post: post._id }));
      }
      Promise.all(promises).then(function (votes) {
        for (const [index, post] of posts.entries()) {
          post.karma = votes[index].reduce(function (totalKarma, vote) {
            totalKarma += vote;
          }, 0); // 0 might not be necessary, but whatever.
        }

      });
    });
  });

module.exports = router;

/*           res.status(200).end(JSON.stringify(posts));

          then(function (votes) {
          post.karma = 0;
          for (const vote of votes) {
            post.karma += vote.value;
          }
        }); */
