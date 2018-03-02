const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  profile: {
    GET(req, res) {
      models.User.findOne({ username: req.params.username }).then((user) => {
        res.status(200).json(user);
      });
    },
  },
  posts: {
    GET(req, res) {
      models.User.findOne({ username: req.params.username }).then((user) => {
        models.Post.find({ author: user._id, type: { $not: /Comment/ } }).then((posts) => {
          const promises = [];
          posts.forEach((post) => {
            promises.push(utils.matryoksha(post));
          });
          Promise.all(promises).then(() => {
            res.status(200).json(posts);
          });
        });
      });
    },
  },
  comments: {
    GET(req, res) {
      models.User.findOne({ username: req.params.username }).then((user) => {
        models.Post.find({ author: user._id, type: 'Comment' }).then((comments) => {
          const promises = [];
          comments.forEach((comment) => {
            promises.push(utils.matryoksha(comment));
          });
          Promise.all(promises).then(() => {
            res.status(200).json(comments);
          });
        });
      });
    },
  },
  subreddits: {
    GET(req, res) {
      models.User.findOne({ username: req.params.username }).then((user) => {
        models.Subreddit.find({ creator: user._id }).then((subreddits) => {
          res.status(200).json(subreddits);
        });
      });
    },
  },
  subscriptions: {
    GET(req, res) {
      if (req.session.user) {
        models.Subscription.find({ user: req.session.user._id })
          .populate('subreddit')
          .exec()
          .then((subscriptions) => {
            res.status(200).send(subscriptions);
          })
          .catch(err => res.status(500).send(err));
      } else {
        res.status(401).send('Must be logged in to request user subscriptions');
      }
    },
  },
};
