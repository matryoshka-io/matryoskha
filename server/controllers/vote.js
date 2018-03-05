const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST(req, res) {
    models.Vote.find({ user: req.session.user._id, post: req.params.postId }).then((vote) => {
      if (vote.length !== 0) {
        res.status(409).end('You already voted on this post.');
      } else {
        (new models.Vote({
          user: req.session.user._id,
          post: req.params.postId,
          value: req.body.vote,          
        })).save().then((vote) => {
          models.Post.findOne({ _id: req.params.postId }).then((post) => {
            models.User.update({
              _id: post.author,
            }, {
              $inc: {
                karma: vote.value,
              },
            }).then((response) => {
              res.status(201).json(vote);
            });
          });
        });
      }
    });
  },
  DELETE(req, res) {
    models.Vote.findOne({
      user: req.session.user._id,
      post: req.params.postId,
    }).then((vote) => {
      models.Post.findOne({ _id: req.params.postId }).then((post) => {
        models.User.update({
          _id: post.author,
        }, {
          $inc: {
            karma: -vote.value,
          },
        }).then((response) => {
          models.Vote.remove({
            user: req.session.user._id,
            post: post._id,
          }).then((response) => {
            res.status(200).end('Successfully removed vote!');
          });
        });
      });
    });
  },
};
