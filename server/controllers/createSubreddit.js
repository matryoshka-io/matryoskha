const db = require('../database');
const models = require('../models');

module.exports = function (req, res) {
  // For testing.
  req.session = {
    user: '5a8e0e077f911450d4600d96',
  };
  // Use shortcut later. Omitting the date because the default is "now."
  const newSubredditSkeleton = {
    creator: req.session.user, // I'm assuming that we're using npm – express-session, in which case the User's ID will be attached to the session
    description: req.body.description,
    title: req.body.title,
  };

  const newSubreddit = new models.Subreddit(newSubredditSkeleton);
  newSubreddit.save().then(function (subreddit) {
    res.status(201).end(JSON.stringify(subreddit));
  });
};
