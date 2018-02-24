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
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .populate('author')
      .then((comment) => {
        if (comment.author.username === req.session.username) {
          return models.Post.update({
            type: 'Comment',
            _id: req.params.commentId,
          }, req.body);
        }
      }).then((response) => {
        res.status(201).end('Successfully updated comment!');
      });
  },
  DELETE(req, res) {
    // Same as above.
    models.Post.findOne({ _id: req.params.commentId, type: 'Comment' }).populate('author')
      .then((comment) => {
        if (comment.author.username === req.session.username) {
          return models.Post.remove({ _id: req.params.commentId });
        }
        res.status(401).end('You are not the author of this comment.');
      }).then((response) => {
        utils.evilMatryoksha(req.params.commentId).then((commentsToDelete) => {
          const promises = [];
          commentsToDelete.forEach((comment) => {
            promises.push(models.Post.remove(comment));
          });
          Promise.all(promises).then((response) => {
            res.status(200).end('Deleted comment!');
          });
        });
      });
  },
  POST(req, res) {
    const newCommentData = req.body;
    newCommentData.parent = req.params.commentId;

    models.User.findOne({ username: req.session.username }).then((user) => {
      newCommentData.author = user._id;
      const newComment = new models.Post(newCommentData);
      return newComment.save();
    }).then((comment) => { // Woo, chaining.
      res.status(201).end(JSON.stringify(comment));
    });
  },
};
