const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit: function (req, res) {
      // For testing.
      req.session = {
        user: '5a8e0e077f911450d4600d96', // i.e. admin, see dummy data
      };
      // Use shortcut later. Omitting the date because the default is "now."
      const newSubredditSkeleton = {
        creator: req.session.user, // I'm assuming that we're using npm – express-session, in which case the User's ID will be attached to the session
        description: req.body.description,
        title: req.body.title,
      };

      const newSubreddit = new models.Subreddit(newSubredditSkeleton);
      newSubreddit.save().then(function (subreddit) {
        res.status(201).end(JSON.stringify(subreddit)); // Does this violate REST? Then again, the TA...
      });
    },
    post: function (req, res) {
      models.Subreddit.findOne({ title: req.params.subName }).then(function (subreddit) {
        req.session = {
          user: '5a8e0e077f911450d4600d96',
        };

        // Test of type Text. Put a body, a long rant, for example.
        const newPostSkeleton = {
          author: req.session.user,
          subreddit: subreddit._id,
          title: req.body.title,
          type: req.body.type, // Figure this out from the client end, as I understand there are two different kinds of submission forms.
          body: req.body.body,
        };

        const newPost = new models.Post(newPostSkeleton);
        newPost.save().then(function (post) {
          res.status(201).end(JSON.stringify(post));
        });
      });
    },
  },
  GET: function (req, res) {
    models.Subreddit.findOne({ title: req.params.subName }).then(function (subreddit) {
      models.Post.find({ subreddit: subreddit._id }).lean().then(function (posts) {
        utils.getKarmaAndSort(posts, function (posts) {
          res.status(200).end(JSON.stringify(posts)); // Don't nest, figure out depth thing later.
        });
      });
    });
  },
};
