const slugify = require('slugify');
const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit(req, res) {
      const newSubredditData = {
        title: req.body.title,
        description: req.body.description,
        titleSlug: slugify(req.body.title),
      };
      models.User.findOne({ username: req.session.username })
        .then((user) => {
          newSubredditData.creator = user._id;
          const newSubreddit = new models.Subreddit(newSubredditData);
          newSubreddit.save().then((subreddit) => {
            res.status(201).end(JSON.stringify(subreddit));
          });
        });
    },
    post(req, res) {
      models.Subreddit.findOne({ titleSlug: slugify(req.params.subName) })
        .then((subreddit) => {
          if (req.body.type === 'Text') {
            const newPostData = {
              title: req.body.title,
              type: 'Text',
              body: req.body.body,
              subreddit: subreddit._id,
              titleSlug: slugify(req.body.title),
            };
            models.User.findOne({ username: req.session.username }).then((user) => {
              newPostData.author = user._id;
              const newPost = new models.Post(newPostData);
              newPost.save().then((post) => {
                res.status(201).json(post);
              });
            });
          } else if (req.body.type === 'Image') {
            const newPostData = {
              title: req.body.title,
              type: 'Image',
              url: req.body.url,
              subreddit: subreddit._id,
              titleSlug: slugify(req.body.title),
            };
            models.User.findOne({ username: req.session.username }).then((user) => {
              newPostData.author = user._id;
              const newPost = new models.Post(newPostData);
              newPost.save().then((post) => {
                res.status(201).json(post);
              });
            });
          } else {
            res.status(400).end('Unknown post type.');
          }
        });
    },
  },
  GET(req, res) {
    models.Subreddit.findOne({ titleSlug: slugify(req.params.subName) })
      .then((subreddit) => {
        models.Post.find({ subreddit: subreddit._id }).lean()
          .then((posts) => {
            utils.getKarmaAndSort(posts, (posts) => {
              const promises = [];
              posts.forEach((post) => {
                promises.push(utils.matryoksha(post));
              });
              Promise.all(promises).then(() => {
                res.status(200).end(JSON.stringify(posts));
              });
            });
          });
      });
  },
  PUT(req, res) {
    models.Subreddit.findOne({ titleSlug: slugify(req.params.subName) }).populate('creator').lean()
      .then((subreddit) => {
        if (subreddit.creator.username === req.session.username) {
          models.Subreddit.update({ _id: subreddit._id }, req.body).then((response) => {
            res.status(201).end('Subreddit updated!');
          });
        } else {
          res.status(401).end('You are not the owner of this subreddit.');
        }
      });
  },
};
