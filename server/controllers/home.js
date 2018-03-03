const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET(req, res) {
    if (!req.session.user) {
      models.Post.find({ type: { $not: /Comment/ } })
        .populate('subreddit')
        .populate('author')
        .lean()
        .then((posts) => {
          utils.getKarmaAndSort(req, posts, (posts) => {
            const promises = [];
            posts.forEach((post) => {
              promises.push(utils.matryoksha(req, post));
            });
            Promise.all(promises).then(() => {
              res.status(200).json(posts);
            });
          });
        });
    } else {
      models.Subscription.find({ user: req.session.user._id }).populate('subreddit').then((subscriptions) => {
        models.Post.find({ type: { $not: /Comment/ } })
          .populate('subreddit')
          .populate('author')
          .lean()
          .then((posts) => {
            if (subscriptions.length) {
              posts = posts.filter((post) => {
                let keep = false;
                subscriptions.forEach((subscription) => {
                  if (post.subreddit._id.toString() === subscription.subreddit._id.toString()) {
                    keep = true;
                  }
                });
                return keep;
              });
            }
            utils.getKarmaAndSort(req, posts, (posts) => {
              const promises = [];
              posts.forEach((post) => {
                promises.push(utils.matryoksha(req, post));
              });
              Promise.all(promises).then(() => {
                res.status(200).json(posts);
              });
            });
          });
      });
    }
  },
};
