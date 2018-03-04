const axios = require('axios');

const auth = require('./auth');

const { BASE_URL } = require('../../app.config');

const isNewVote = (voteArray, currentVote) => {
  return voteArray.filter(vote => vote._id === currentVote._id && vote.karma === currentVote.choice).length === 0;
};

const castVote = (session, postId, choice) => {
  return new Promise((resolve, reject) => {
    const headers = auth.makeTokenHeader(session.token);
    const requestUrl = `${BASE_URL}/api/vote/${postId}`;
    return axios.post(requestUrl, { vote: choice }, headers)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
};

const setVoteInPosts = (posts, vote, previousVote) => {
  return posts.map((post) => {
    if (post._id === vote._id) {
      post.voted = vote.choice;
      // relative effect of having a previous vote
      post.karma = previousVote ? post.karma += vote.choice * 2 : post.karma += vote.choice;
    }
    return post;
  });
};

module.exports = {
  isNewVote,
  castVote,
  setVoteInPosts,
};
