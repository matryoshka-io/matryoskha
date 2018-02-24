const db = require('../database');
const models = require('../models');

const utils = require('./utils');

// Todo: disallow users from upvoting or downvoting endlessly.
module.exports = {
  POST(req, res) {
    models.User.findOne({ username: req.session.username }).then((user) => {
      const newVoteData = {
        user: user._id,
        post: req.params.postId,
        value: req.body.vote, // Either -1 for a downvote or 1 for an upvote. This is handled by the client.
      };
      const newVote = new models.Vote(newVoteData);
      newVote.save().then((vote) => {
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
    });
  },
  DELETE(req, res) {
    models.User.findOne({ username: req.session.username }).then((user) => {
      models.Vote.findOne({
        user: user._id,
        post: req.params.postId,
      }).then((vote) => {
        console.log(vote);
        models.Post.findOne({ _id: req.params.postId }).then((post) => {
          models.User.update({
            _id: post.author,
          }, {
            $inc: {
              karma: -vote.value,
            },
          }).then((response) => {
            models.Vote.remove({
              user: user._id,
              post: post._id,
            }).then((response) => {
              res.status(200).end('Successfully removed vote!');
            });
          });
        });
      });
    })
  },
};
