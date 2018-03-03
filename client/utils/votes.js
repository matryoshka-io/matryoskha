const axios = require('axios');

const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

const isNewVote = (voteArray, currentVote) => {
  return voteArray.filter(vote => vote._id === currentVote._id && vote.karma === currentVote.choice).length === 0;
};

const castVote = (session, postId) => {
  return new Promise((resolve, reject) => {
    const headers = session.user ? auth.makeTokenHeader(session.token) : {};
    const requestUrl = `${BASE_URL}/api/vote/${postId}`;
    return axios.post(requestUrl, headers)
      .then((result) => {
        console.log(result.status);
        return resolve(true);
      })
      .catch((err) => {
        console.log(err.status);
        return reject(err);
      });
  });
};

module.exports = {
  isNewVote,
  castVote,
};
