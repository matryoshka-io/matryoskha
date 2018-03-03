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
        .then(posts => utils.getKarmaAndSortPromise(req, posts))
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    } else {
      models.Subscription.find({ user: req.session.user._id })
        .select('subreddit')
        .exec()
        .then((subscriptions) => {
          const subscriptionIds = subscriptions.reduce((list, sub) => { list.push(sub.subreddit); return list; }, []);
          const query = { type: { $not: /Comment/ } };
          if (subscriptions.length > 0) {
            query.subreddit = { $in: subscriptionIds };
          }
          return models.Post.find(query)
            .populate('subreddit')
            .populate('author')
            .lean();
        })
        .then(posts => utils.getKarmaAndSortPromise(req, posts))
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    }
  },
};
