const db = require('../database');
const models = require('../models');

const utils = require('./utils');

// Some DRY violations for Comments and Posts, vis a vis GET and DELETE. Everything else seems to make sense though.
// Maybe just DELETE.
module.exports = {
  GET(req, res) {
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .lean()
      .then((comment) => {
        utils.getKarma(comment, (comment) => {
          utils.matryoksha(comment).then(() => {
            res.status(200).json(comment);
          });
        });
      }).catch((err) => {
        res.status(404).end(`No such comment found for id: ${req.params.commendId}`);
      });
  },
  PUT(req, res) {
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .populate('author')
      .then((comment) => {
        if (comment.author.username === req.session.username) {
          return models.Post.update({
            type: 'Comment',
            _id: req.params.commentId,
          }, {
            body: req.body.body,
          });
        }
      }).then((response) => {
        res.status(201).end('Successfully updated comment!');
      });
  },
  DELETE(req, res) {
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
    const newCommentData = {
      body: req.body.body,
    };
    newCommentData.parent = req.params.commentId;

    models.User.findOne({ username: req.session.username }).then((user) => {
      newCommentData.author = user._id;
      const newComment = new models.Post(newCommentData);
      return newComment.save();
    }).then((comment) => {
      res.status(201).json(comment);
    });
  },
};
