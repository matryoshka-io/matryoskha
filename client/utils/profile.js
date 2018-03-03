const axios = require('axios');
const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

const subscribe = (session, subreddit) => {
  if (session.user && session.token && subreddit) {
    return new Promise((resolve, reject) => {
      const requestUrl = `${BASE_URL}/api/subscription/${subreddit}`;
      return axios.post(requestUrl, auth.makeTokenHeader(session.token))
        .then((result) => {
          console.log('subscription result \n', result);
          return resolve(result.data);
        })
        .catch(err => reject(err));
    });
  }
  return false;
};

const getSubscriptions = (session) => {
  return new Promise((resolve, reject) => {
    if (session.user && session.token) {
      const requestUrl = `${BASE_URL}/api/user/${session.user.username}/subscriptions`;
      const headers = auth.makeTokenHeader(session.token);
      return axios.get(requestUrl, headers)
        .then(subscriptions => resolve(subscriptions.data))
        .catch(err => reject(err));
    }
    return resolve([]);
  });
};

module.exports = {
  subscribe,
  getSubscriptions,
};
