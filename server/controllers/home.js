const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET(req, res) {
    // req.session = null; // Testing purposes.
    if (req.session === null) {
      models.Post.find({ type: { $not: /Comment/ } })
        .populate('subreddit')
        .populate('author')
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
      models.User.findOne({ username: req.session.user.username }).then((user) => {
        models.Subscription.find({ user: user._id }).populate('subreddit').then((subscriptions) => {
          models.Post.find({ type: { $not: /Comment/ } })
            .populate('subreddit')
            .populate('author')
            .lean()
            .then((posts) => {
              posts = posts.filter((post) => {
                let keep = false;
                subscriptions.forEach((subscription) => {
                  if (post.subreddit._id.toString() === subscription.subreddit._id.toString()) {
                    keep = true;
                  }
                });
                return keep;
              });
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
        });
      });
    }
  },
};
