const axios = require('axios');

const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

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
        return reject(false);
      });
  });
};

module.exports = {
  castVote,
};