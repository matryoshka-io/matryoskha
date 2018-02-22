const router = require('express').Router();

const db = require('../database');
const models = require('../models');

const matryoksha = function (post) {
  return new Promise(function (resolve, reject) {
    models.Post.find({ type: 'Comment', parent: post._id }).then(function (comments) {
      post = { comments };
      const promises = [];
      for (const comment of post.comments) {
        promises.push(matryoksha(comment));
      }
      Promise.all(promises).then(function () {
        resolve();
      });
    });
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

        const finalPromises = [];
        for (const post of posts) {
          finalPromises.push(matryoksha(post));
        }
        Promise.all(finalPromises).then(function () {
          res.status(200).end(JSON.stringify(posts));
        });
      });
    });
  });

module.exports = router;
