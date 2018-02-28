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
      .populate('author')
      .lean()
      .then((post) => {
        utils.getKarma(post, (post) => {
          utils.matryoksha(post).then(() => {
            res.status(200).end(JSON.stringify(post));
          });
        });
      });
  },
  PUT(req, res) {
    models.Post.findOne({ _id: req.params.postId }).then((post) => {
      if (post.author.toString() === req.session.user._id.toString()) {
        models.Post.update({
          _id: req.params.postId,
        }, req.body).then((response) => {
          res.status(201).end('Post updated!');
        });
      } else {
        res.status(401).end('You did not author this post.');
      }
    });
  },
  POST(req, res) {
    (new models.Post({
      type: 'Comment',
      body: req.body.body,
      parent: req.params.postId,
      author: req.session.user._id,      
    })).save().then((comment) => {
      res.status(201).json(comment); 
    });
  },
  DELETE(req, res) {
    models.Post.findOne({ _id: req.params.postId }).then((post) => {
      if (post.author.toString() === req.session.user._id.toString()) {
        return models.Post.remove({ _id: req.params.postId });
      }
      res.status(401).end('You are not the author of this post.');
    }).then((response) => {
      utils.evilMatryoksha(req.params.postId).then((commentsToDelete) => {
        const promises = [];
        commentsToDelete.forEach((comment) => {
          promises.push(models.Post.remove(comment));
        });
        Promise.all(promises).then((response) => {
          res.status(200).end('Deleted post!');
        });
      });
    });
  },
};
