const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET(req, res) {
    models.Post.findOne({
      _id: req.params.postId,
      type: {
        $not: /Comment/,
      },
    }).populate('subreddit')
      .populate('author') // Leave out link for now, testing purposes.
      .then((post) => {
        res.status(200).end(JSON.stringify(post));
      });
  },
  PUT(req, res) {
    models.Post.update({
      _id: req.params.postId,
    }, {
      title: req.body.title,
      body: req.body.body, // Shorthand later.
    }).then((response) => {
      res.status(201).end('Post updated!');
    });
  },
  POST(req, res) {
    // Some things to standardize later...
    // 1) The shorthand, after which I tack on new properties.
    // 2) Using the name of the sub, or the id, probably the id, for consistency.
    const newComment = new models.Post({
      subreddit: req.params.subId,
      title: req.body.title,
      type: req.body.type,
      author: req.session.username, // NOPE! | Find id of user via username, then do this insert.
      parent: req.params.postId,
    });
    newComment.save().then((comment) => {
      res.status(201).end(JSON.stringify(comment));
    });
  },
  DELETE(req, res) {
    // Oh boy...
  }
};
