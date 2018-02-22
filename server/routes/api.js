const router = require('express').Router();

const db = require('../database');
const models = require('../models');

router.get('/', function (req, res) {
  models.Post.find({ type: { $not: /Comment/ }})
    .populate('subreddit')
    .populate('author')
    .populate('link')
    .then(function (posts) {
      for (const post of posts) {
        models.Vote.find({ post: post._id }).then(function (votes) {
          post.karma = 0;
          for (const vote of votes) {
            post.karma += vote.value;
          }
          res.status(200).end(JSON.stringify(posts));
        });
      }
    });
  });

module.exports = router;
