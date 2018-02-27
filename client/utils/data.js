const axios = require('axios');

const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

const getPosts = (session, subreddit = null, offset = 0) => {
  let headers = {};
  if (session.user) {
    headers = auth.makeTokenHeader(session.token);
  }
  return new Promise((resolve, reject) => {
    return axios.get(`${BASE_URL}/api/`, headers)
      .then(result => resolve(result.data))
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
};

module.exports = {
  getPosts,
};
