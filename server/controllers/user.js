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
        models.Post.find({ author: user._id, type: 'Comment' } }).then((comments) => {
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
        models.Subreddit.find({ creator: user._id } }).then((subreddits) => {
          res.status(200).json(subreddits);
        });
      });  
    },
  },
};
