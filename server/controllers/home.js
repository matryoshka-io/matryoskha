/* eslint-disable indent */

const db = require('../database');
const models = require('../models');

const utils = require('./utils');

module.exports = {
  GET(req, res) {
    models.Post.find({ type: { $not: /Comment/ } })
      .populate('subreddit')
      .populate('author')
      .populate('link')
      .lean()
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
    },
  POST(req, res) {
    // Eh...
  },
};
