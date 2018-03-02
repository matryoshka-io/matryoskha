const db = require('../../database');
const models = require('../../models');

const karmaSort = (firstPost, secondPost) => {
  if (firstPost.karma > secondPost.karma) {
    return -1;
  } else if (firstPost.karma < secondPost.karma) {
    return 1;
  }
  return 0;
};

const getKarma = (post, callback) => {
  models.Vote.find({ post: post._id }).then((votes) => {
    post.karma = votes.reduce((totalKarma, vote) => totalKarma + vote.value, 0);
    callback(post);
  });
};

const getKarmaAndSort = (posts, callback) => {
  const promises = [];
  posts.forEach((post) => {
    promises.push(models.Vote.find({ post: post._id }));
  });
  Promise.all(promises).then((votes) => {
    Object.entries(posts).forEach(([index, post]) => {
      post.karma = votes[index].reduce((totalKarma, vote) => totalKarma + vote.value, 0);
    });
    posts.sort(karmaSort);

    callback(posts);
  });
};

const matryoksha = (post, depth = 0) =>
  new Promise((resolve, reject) => {
    if (depth > 2) {
      resolve();
    } else {
      models.Post.find({ type: 'Comment', parent: post._id })
        .populate('author')
        .lean()
        .then((comments) => {
          getKarmaAndSort(comments, (comments) => {
            post.comments = comments;
            const promises = [];
            post.comments.forEach((comment) => {
              promises.push(matryoksha(comment, depth + 1));
            });
            Promise.all(promises).then(() => {
              resolve();
            });
          });
        });
    }
  });

const evilMatryoksha = (postId, commentsList = []) =>
  new Promise((resolve, reject) => {
    models.Post.find({ type: 'Comment', parent: postId }).then((comments) => {
      commentsList = commentsList.concat(comments);
      const promises = [];
      comments.forEach((comment) => {
        promises.push(evilMatryoksha(comment._id));
      });
      Promise.all(promises).then((childrenComments) => {
        childrenComments = childrenComments.reduce((flatArr, child) => flatArr.concat(child), []);
        resolve(commentsList.concat(childrenComments));
      });
    });
  });

module.exports = {
  matryoksha,
  evilMatryoksha,
  getKarmaAndSort,
  getKarma,
};
