/* eslint-disable indent */

const db = require('../database');
const models = require('../models');

const utils = require('./utils');

// What about the authed route? There must be some logic there,
// as per subscriptions. Gotta figure out the middleware for authentication.
module.exports = {
  req.session = null; // Testing purposes.
  GET(req, res) {
    req.session = null; // Testing purposes.
    if (req.session === null) {
      models.Post.find({ type: { $not: /Comment/ } })
        .populate('subreddit')
        .populate('author')
        .populate('link')
        .lean()
        .then((posts) => {
          utils.getKarmaAndSort(posts, (posts) => {
            const promises = [];
            posts.forEach((post) => {
              promises.push(utils.matryoksha(post));
            });
            Promise.all(promises).then(() => {
              res.status(200).end(JSON.stringify(posts));
            });
          });
        });
    } else {
      // Find subscriptions (all subreddits the user is subscribed to),
      // sort by karma, i.e. the posts in those subreddits,
      // send those posts back.
    }
  },
  POST(req, res) {
    // Eh...
  },
};
