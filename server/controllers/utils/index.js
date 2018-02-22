const db = require('../../database');
const models = require('../../models');

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

const getKarmaAndSort = function (posts, callback) {
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

    callback(posts);
  });
};

module.exports = {
  matryoksha,
  getKarmaAndSort,
};
