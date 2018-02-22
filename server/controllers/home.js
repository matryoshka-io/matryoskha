const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET: function (req, res) {
    models.Post.find({ type: { $not: /Comment/ }})
      .populate('subreddit')
      .populate('author')
      .populate('link')
      .lean()
      .then(function (posts) {
        utils.getKarmaAndSort(posts, function (posts) {
          const promises = [];
          for (const post of posts) {
            promises.push(utils.matryoksha(post));
          }
          Promise.all(promises).then(function () {
            res.status(200).end(JSON.stringify(posts));
          });
        });
      });
    },
  POST: function (req, res) {
    // Eh...
  },
};
