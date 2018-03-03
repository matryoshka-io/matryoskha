const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST(req, res) {
    models.Vote.findOne({ user: req.session.user._id, post: req.params.postId })
      .then((vote) => {
        // if a vote exists, update the value with the new vote cast
        // accounts for the 2pt effective swing of changing a vote
        if (vote) {
          const effectiveVote = req.body.vote * 2;
          let response = {};
          vote
            .update({ value: req.body.vote }, { new: true })
            .then((update) => {
              response = update;
              // apply effective vote to post karma
              return models.Post.findOneAndUpdate({ _id: vote.post }, { $inc: { karma: effectiveVote } }, { new: true });
            })
            // and to user karma
            .then(post => models.User.findOneAndUpdate({ _id: post.author }, { $inc: { karma: effectiveVote } }, { new: true }))
            .then(user => res.status(201).send(response))
            .catch(err => res.status(500).send(err));
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
