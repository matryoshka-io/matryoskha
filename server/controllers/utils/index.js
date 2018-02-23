const db = require('../../database');
const models = require('../../models');

const matryoksha = post =>
  new Promise((resolve, reject) => {
    models.Post.find({ type: 'Comment', parent: post._id }).lean().then((comments) => {
      post.comments = comments;
      const promises = [];
      post.comments.forEach((comment) => {
        promises.push(matryoksha(comment));
      });
      Promise.all(promises).then(() => {
        resolve();
      });
    });
  });

const getKarmaAndSort = (posts, callback) => {
  const promises = [];
  posts.forEach((post) => {
    promises.push(models.Vote.find({ post: post._id }));
  });
  Promise.all(promises).then((votes) => {
    Object.entries(posts).forEach(([index, post]) => {
      post.karma = votes[index].reduce((totalKarma, vote) => totalKarma + vote.value, 0);
    });
    posts.sort((firstPost, secondPost) => {
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
