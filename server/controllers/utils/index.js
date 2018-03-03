const db = require('../../database');
const models = require('../../models');

const tackVote = (req, post) =>
  new Promise((resolve, reject) => {
    models.Vote.find({
      post: post._id,
      user: req.session.user._id,
    }).then((votes) => {
      if (votes.length > 0) {
        post.voted = votes[0].value; // lulz
      }
      resolve();
    });
  });

const karmaSort = (firstPost, secondPost) => {
  if (firstPost.karma > secondPost.karma) {
    return -1;
  } else if (firstPost.karma < secondPost.karma) {
    return 1;
  }
  return 0;
};

const getKarma = (req, post, callback) => {
  models.Vote.find({ post: post._id }).then((votes) => {
    tackVote(req, post).then(() => {
      post.karma = votes.reduce((totalKarma, vote) => totalKarma + vote.value, 0);
      callback(post);
    });
  });
};

const getKarmaAndSort = (req, posts, callback) => {
  let promises = [];
  posts.forEach((post) => {
    promises.push(tackVote(req, post));
  });
  Promise.all(promises).then(() => {
    promises = [];
    posts.forEach((post) => {
      promises.push(models.Vote.find({ post: post._id }));
    });
    return Promise.all(promises);
  }).then((votes) => {
    Object.entries(posts).forEach(([index, post]) => {
      post.karma = votes[index].reduce((totalKarma, vote) => totalKarma + vote.value, 0);
    });
    posts.sort(karmaSort);
    callback(posts);
  });
};

const matryoksha = (req, post, depth = 0) =>
  new Promise((resolve, reject) => {
    if (depth > 2) {
      resolve();
    } else {
      models.Post.find({ type: 'Comment', parent: post._id })
        .populate('author')
        .lean()
        .then((comments) => {
          getKarmaAndSort(req, comments, (comments) => {
            post.comments = comments;
            const promises = [];
            post.comments.forEach((comment) => {
              promises.push(matryoksha(req, comment, depth + 1));
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
