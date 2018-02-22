const matryoksha = require('./matryoksha');

const db = require('../database');
const models = require('../models');

module.exports = {
  GET: function (req, res) {
    models.Post.find({ type: { $not: /Comment/ }})
      .populate('subreddit')
      .populate('author')
      .populate('link')
      .lean()
      .then(function (posts) {
        const promises = [];
        for (const post of posts) {
          promises.push(models.Vote.find({ post: post._id }));
        }
        Promise.all(promises).then(function (votes) {
          for (const [index, post] of posts.entries()) {
            post.karma = votes[index].reduce(function (totalKarma, vote) {
              return totalKarma + vote.value;
            }, 0);
          }

          posts.sort(function (firstPost, secondPost) {
            if (firstPost.karma > secondPost.karma) {
              return -1;
            } else if (firstPost.karma < secondPost.karma) {
              return 1;
            }
            return 0;
          });

          const finalPromises = [];
          for (const post of posts) {
            finalPromises.push(matryoksha(post));
          }
          Promise.all(finalPromises).then(function () {
            res.status(200).end(JSON.stringify(posts));
          });
        });
      });
    },
  POST: function (req, res) {
    // Eh...
  },
};
