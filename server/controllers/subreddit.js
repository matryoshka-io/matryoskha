const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit(req, res) {
      (new models.Subreddit({
        title: req.body.title,
        description: req.body.description,
        creator: req.session.user._id,
      })).save().then((subreddit) => {
        res.status(201).json(subreddit);
      }).catch((err) => {
        if (err.code === 11000) {
          res.status(409).end('There is already a subreddit with that name!');
        } else {
          res.status(400).end(`Error while creating subreddit: ${err}`);
        }
      });
    },
    post(req, res) {
      models.Subreddit.findOne({ titleSlug: req.params.subName }).then((subreddit) => {
        if (req.body.type === 'Text') {
          (new models.Post({
            title: req.body.title,
            type: 'Text',
            body: req.body.body,
            subreddit: req.body.subreddit,
            author: req.session.user._id,
          })).save().then((post) => {
            res.status(201).json(post);
          });
        } else if (req.body.type === 'Image' || req.body.type === 'Video') {
          (new models.Post({
            title: req.body.title,
            type: req.body.type,
            url: req.body.url,
            subreddit: subreddit._id,
            author: req.session.user._id,
          })).save().then((post) => {
            res.status(201).json(post);
          });
        } else if (req.body.type === 'Article') {
          // Pass...
        } else {
          res.status(400).end('Unknown post type.');
        }
      });
    },
  },
  GET(req, res) {
    models.Subreddit.findOne({ titleSlug: req.params.subName }).then((subreddit) => {
      models.Post.find({ subreddit: subreddit._id }).lean().then((posts) => {
        utils.getKarmaAndSort(posts, (posts) => {
          const promises = [];
          posts.forEach((post) => {
            promises.push(utils.matryoksha(post));
          });
          Promise.all(promises).then(() => {
            res.status(200).json(posts);
          });
        })
      });
    });
  },
  PUT(req, res) {
    models.Subreddit.findOne({ titleSlug: req.params.subName })
      .lean()
      .then((subreddit) => {
        if (subreddit.creator.toString() === req.session.user._id.toString()) {
          models.Subreddit.update({ _id: subreddit._id }, req.body).then((response) => {
            res.status(201).end('Subreddit updated!');
          });
        } else {
          res.status(401).end('You are not the owner of this subreddit.');
        }
      });
  },
};
