const axios = require('axios');

const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  POST: {
    subreddit(req, res) {
      const newSubredditData = {
        title: req.body.title,
        description: req.body.description,
        creator: req.session.user._id,
      };
      const newSubreddit = new models.Subreddit(newSubredditData);
      newSubreddit.save().then((subreddit) => {
        res.status(201).end(JSON.stringify(subreddit));
      });
    },
    post(req, res) {
      models.Subreddit.findOne({ titleSlug: req.params.subName }).then((subreddit) => {
        if (req.body.type === 'Text') {
          const newPostData = {
            title: req.body.title,
            type: 'Text',
            body: req.body.body,
            subreddit: subreddit._id,
            author: req.session.user._id,
          };
          const newPost = new models.Post(newPostData);
          newPost.save().then((post) => {
            res.status(201).json(post);
          });
        } else if (req.body.type === 'Image' || req.body.type === 'Video') {
          const newPostData = {
            title: req.body.title,
            type: req.body.type,
            url: req.body.url,
            subreddit: subreddit._id,
            author: req.session.user._id,
          };
          const newPost = new models.Post(newPostData);
          newPost.save().then((post) => {
            res.status(201).json(post);
          });
        } else if (req.body.type === 'Article') {
          /* axios({
            method: 'get',
            dataType: 'text/html',
            url: req.body.url,
          }).then((response) => {
            console.log(response.data);
            res.status(200).end('' + response.data);
          });
          const newPostData = {
            title: req.body.title,
            type: 'Article',
            url: req.body.url,
            metadata: {

            },
          }; */
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
          Promise.all(promises).then((posts) => {
            res.status(200).json(posts);
          }).catch((err) => {
            res.status(400).send([]);
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
