const db = require('../database');
const models = require('../models');

const utils = require('./utils');

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
    models.User.findOne(req.session)
      .then((user) => {
        return models.Post.findOne({ type: 'Comment', _id: req.params.commentId });
      })
      .then(())
  },
  DELETE(req, res) {

  },
  POST(req, res) {

  },
};
