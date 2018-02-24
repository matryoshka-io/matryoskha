const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST(req, res) {
    models.User.findOne(req.session).then((user) => {
      const newVoteData = {
        user: user._id,
        post: req.params.postId,
        value: req.body.vote, // Either -1 for a downvote or 1 for an upvote. This is handled by the client.
      };
      const newVote = new models.Vote(newVoteData);
      newVote.save().then((vote) => {
        res.status(201).json(vote);
      })
    });
  },
  DELETE(req, res) {
    models.User.findOne(req.session).then((user) => {
      models.Vote.remove({
        user: user._id,
        _id: req.params.postId,
      }).then((response) => {
        res.status(200).end('Successfully removed vote!');
      });
    });
  },
};
