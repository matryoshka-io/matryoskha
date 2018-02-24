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
      .lean()
      .then((post) => {
        utils.matryoksha(post).then(() => {
          res.status(200).end(JSON.stringify(post));
        });
      });
  },
  PUT(req, res) {
    models.Post.findOne({ _id: req.params.postId }).populate('author').then((post) => {
      if (post.author.username === req.session.username) {
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
    const newCommentData = {
      type: 'Comment',
      body: req.body.body,
    };
    newCommentData.parent = req.params.postId;
    
    models.User.findOne({ username: req.session.username }).then((user) => {
      newCommentData.author = user._id;
      const newComment = new models.Post(newCommentData);
      return newComment.save();
    }).then((comment) => { // Woo, chaining.
      res.status(201).end(JSON.stringify(comment));
    });
  },

  // Admins/owners of subreddits should be able to delete all posts/comments in that subreddit.
  DELETE(req, res) {
    models.Post.findOne({ _id: req.params.postId }).populate('author')
      .then((post) => {
        if (post.author.username === req.session.username) {
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
