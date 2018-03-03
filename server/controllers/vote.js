const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST(req, res) {
    models.Vote.findOne({ user: req.session.user._id, post: req.params.postId })
      .then((vote) => {
        // if a vote exists, update the value with the new vote cast
        if (vote) {
          // accounts for the 2pt effective swing of changing a vote
          const effectiveVote = req.body.vote * 2;
          vote
            .update({ value: req.body.vote }, { new: true })
            // TODO:  utility syndication helper
            .then(update => models.Post.findOneAndUpdate({ _id: vote.post }, { $inc: { karma: effectiveVote } }, { new: true }))
            .then(post => models.User.findOneAndUpdate({ _id: post.author }, { $inc: { karma: effectiveVote } }, { new: true }))
            .then(user => res.status(201).send({ success: true }))
            .catch(err => res.status(500).send(err));
        } else {
          (new models.Vote({
            user: req.session.user._id,
            post: req.params.postId,
            value: req.body.vote,
          }))
            .save()
            .then(vote => models.Post.findOneAndUpdate({ _id: req.params.postId }, { $inc: { karma: req.body.vote } }, { new: true }))
            .then(post => models.User.findOneAndUpdate({ _id: post.author }, { $inc: { karma: req.body.vote } }, { new: true }))
            .then(response => res.status(201).json(vote))
            .catch(err => res.status(500).send(err));
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
