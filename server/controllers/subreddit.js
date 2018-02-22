const db = require('../database');
const models = require('../models');

module.exports = {
  POST: function (req, res) {
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
  GET: function (req, res) {
    models.Subreddit.findOne({ title: req.params.subName }).then(function (subreddit) {
      models.Post.find({ subreddit: subreddit._id }).lean().then(function (posts) {
        const promises = [];
        for (const post of posts) {
          promises.push(models.Vote.find({ post: post._id }));
        }
        Promise.all(promises).then(function (votes) {
          for (const [index, post] of posts.entries()) {
            post.karma = votes[index].reduce(function (totalKarma, vote) {
              return totalKarma + vote.value;
            }, 0);
          }

          posts.sort(function (firstPost, secondPost) {
            if (firstPost.karma > secondPost.karma) {
              return -1;
            } else if (firstPost.karma < secondPost.karma) {
              return 1;
            }
            return 0;
          });

          res.status(200).end(JSON.stringify(posts));
        });
      });
    });
  },
};
