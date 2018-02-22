const db = require('../database');
const models = require('../models');

const matryoksha = function (post) {
  return new Promise(function (resolve, reject) {
    models.Post.find({ type: 'Comment', parent: post._id }).lean().then(function (comments) {
      post.comments = comments;
      const promises = [];
      for (const comment of post.comments) {
        promises.push(matryoksha(comment));
      }
      Promise.all(promises).then(function () {
        resolve();
      });
    });
  });
};

module.exports = matryoksha;
