/* eslint-disable eqeqeq */

const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit(req, res) {
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
      newSubreddit.save().then((subreddit) => {
        res.status(201).end(JSON.stringify(subreddit)); // Does this violate REST? Then again, the TA...
      });
    },
    post(req, res) {
      models.Subreddit.findOne({ title: req.params.subName }).then((subreddit) => {
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
        newPost.save().then((post) => {
          res.status(201).end(JSON.stringify(post));
        });
      });
    },
  },
  GET(req, res) {
    models.Subreddit.findOne({ title: req.params.subName }).then((subreddit) => {
      models.Post.find({ subreddit: subreddit._id }).lean().then((posts) => {
        utils.getKarmaAndSort(posts, (posts) => {
          res.status(200).end(JSON.stringify(posts)); // Don't nest, figure out depth thing later.
        });
      });
    });
  },
  PUT(req, res) {
    req.session = {
      user: '5a8e0e077f911450d4600d96',
    };
    // Perhaps no need for populating.
    models.Subreddit.findOne({ title: req.params.subName }).populate('creator').lean().then((subreddit) => {
      // console.log(typeof subreddit.creator._id === 'object');
      // console.log(typeof req.session.user === 'string');
      // That sexy loose equality though.
      if (subreddit.creator._id == req.session.user) {
        models.Subreddit.update({ _id: subreddit._id }, {
          title: req.body.title,
          description: req.body.description, // Use shorthand later.
        }).then((response) => {
          res.status(201).end('Subreddit updated!');
        });
      } else {
        res.status(401).end('You are not the owner of this subreddit.');
      }
    });
  },
};
