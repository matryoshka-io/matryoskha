const axios = require('axios');

const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

const getPosts = (session, subreddit = null, offset = 0) => {
  let headers = {};
  if (session.user) {
    headers = auth.makeTokenHeader(session.token);
  }
  const requestUrl = subreddit ? `${BASE_URL}/api/sub/${subreddit}` : `${BASE_URL}/api/`;
  console.log(`GET POSTS FROM: ${subreddit ? subreddit : 'Frontpage'} ${session.user ? session.user.username : 'No User'}`);
  return new Promise((resolve, reject) => {
    return axios.get(requestUrl, headers)
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
