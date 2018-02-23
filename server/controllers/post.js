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
    }, req.body).then((response) => {
      res.status(201).end('Post updated!');
    });
  },
  POST(req, res) {
    req.session = {
      username: 'admin',
    };
    const newCommentData = req.body;
    newCommentData.subreddit = req.params.subId;
    newCommentData.parent = req.params.postId;

    // req.session ONLY has username?
    models.User.findOne(req.session).then((user) => {
      newCommentData.author = user._id;
      const newComment = new models.Post(newCommentData);
      return newComment.save();
    }).then((comment) => { // Woo, chaining.
      res.status(201).end(JSON.stringify(comment));
    });
  },

  // Admins/owners of subreddits should be able to delete all posts/comments in that subreddit.
  DELETE(req, res) {
    req.session = {
      username: 'test',
    };
    // Same as above.
    models.User.findOne(req.session).then((user) => {
      // Wanna avoid the loose equality issue, so populate.
      // It definitely is necessary to use findOne, else we get an array, which is annoying.
      return models.Post.findOne({ _id: req.params.postId }).populate('author');
    }).then((post) => {
      if (post.author.username === req.session.username) {
        return models.Post.remove({ _id: req.params.postId });
      } else {
        res.status(401).end('You are not the author of this post.');
      }
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
