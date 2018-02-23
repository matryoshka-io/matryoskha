const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit(req, res) {
      req.session = {
        username: 'admin',
      };
      const newSubredditData = req.body;
      models.User.findOne(req.session).then((user) => {
        newSubredditData.creator = user._id;
        const newSubreddit = new models.Subreddit(newSubredditData);
        newSubreddit.save().then((subreddit) => {
          res.status(201).end(JSON.stringify(subreddit)); // Does this violate REST? Then again, the TA...
        });
      });
    },
    post(req, res) {
      models.Subreddit.findOne({ _id: req.params.subId }).then((subreddit) => {
        req.session = {
          username: 'admin',
        };

        const newPostData = req.body;
        newPostData.subreddit = subreddit._id;

        models.User.findOne(req.session).then((user) => {
          newPostData.author = user._id;
          const newPost = new models.Post(newPostData);
          newPost.save().then((post) => {
            res.status(201).end(JSON.stringify(post));
          });
        });
      });
    },
  },
  GET(req, res) {
    models.Post.find({ subreddit: req.params.subId }).lean().then((posts) => {
      utils.getKarmaAndSort(posts, (posts) => {
        res.status(200).end(JSON.stringify(posts)); // Don't nest, figure out depth thing later.
      });
    });
  },
  PUT(req, res) {
    req.session = {
      username: 'admin',
    };
    models.Subreddit.findOne({ _id: req.params.subId }).populate('creator').lean().then((subreddit) => {
      if (subreddit.creator.username === req.session.username) {
        models.Subreddit.update({ _id: subreddit._id }, req.body).then((response) => {
          res.status(201).end('Subreddit updated!');
        });
      } else {
        res.status(401).end('You are not the owner of this subreddit.');
      }
    });
  },
};
