const db = require('../database');
const models = require('../models');

const utils = require('./utils');

// Gotta be consistent with catching errors and sending responses for those errors.
module.exports = {
  GET(req, res) {
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .then((comment) => {
        res.status(200).end(JSON.stringify(comment));
      }).catch((err) => {
        res.status(404).end(`No such comment found for id: ${req.params.commendId}`);
      });
  },
  // Admins should be able to edit comments (i.e. owners/creators of subreddits).
  PUT(req, res) {
    req.session = {
      username: 'admin',
    };
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .populate('author')
      .then((comment) => {
        if (comment.author.username === req.session.username) {
          return models.Post.update({
            type: 'Comment',
            _id: req.params.commentId,
          }, req.body);
        }
      })
      .then((response) => {
        res.status(201).end('Successfully updated comment!');
      });
  },
  DELETE(req, res) {
    
  },
  POST(req, res) {

  },
};
