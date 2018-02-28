const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST(req, res) {
    models.Subreddit.findOne({ titleSlug: req.params.subName }).then((subreddit) => {
      models.Subscription.find({
        user: req.session.user._id,
        subreddit: subreddit._id,
      }).then((subscriptions) => {
        if (subscriptions.length > 0) {
          res.status(409).end('You are already subscribed to this subreddit.');
        } else {
          (new models.Subscription({
            user: req.session.user._id,
            subreddit: subreddit._id,
          })).save().then((subscription) => {
            res.status(201).json(subscription);
          });
        }
      });
    });
  },
  DELETE(req, res) {
    models.Subreddit.findOne({ titleSlug: req.params.subName }).then((subreddit) => {
      models.Subscription.remove({
        user: req.session.user._id,
        subreddit: subreddit._id,
      }).then((response) => {
        res.status(200).end('Successfully deleted subscription (assuming it was there).');
      });
    }); 
  },
};
