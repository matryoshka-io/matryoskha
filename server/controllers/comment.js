const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET(req, res) {
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId })
      .lean()
      .then((comment) => {
        utils.getKarma(req, comment, (comment) => {
          utils.matryoksha(req, comment).then(() => {
            res.status(200).json(comment);
          });
        });
      }).catch((err) => {
        res.status(404).end(`No such comment found for id: ${req.params.commendId}`);
      });
  },
  PUT(req, res) {
    models.Post.findOne({ type: 'Comment', _id: req.params.commentId }).then((comment) => {
      if (comment.author.toString() === req.session.user._id.toString()) {
        return models.Post.update({
          type: 'Comment',
          _id: req.params.commentId,
        }, {
          body: req.body.body,
        });
      } 
      res.status(401).end('You did not author this comment!');
    }).then((response) => {
      res.status(201).end('Successfully updated comment!');
    });
  },
  DELETE(req, res) {
    models.Post.findOne({ _id: req.params.commentId, type: 'Comment' }).then((comment) => {
      if (comment.author.toString() === req.session.user._id.toString()) {
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
    (new models.Post({
      body: req.body.body,
      type: 'Comment',
      parent: req.params.commentId,
      author: req.session.user._id,      
    })).save().then((comment) => {
      res.status(201).json(comment);
    });
  },
};
