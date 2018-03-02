const axios = require('axios');

const auth = require('./auth');

const BASE_URL = 'http://localhost:3000';

const getPosts = (session, subreddit = null, offset = 0) => {
  const headers = session.user ? auth.makeTokenHeader(session.token) : {};
  const requestUrl = subreddit !== null ? `${BASE_URL}/api/sub/${subreddit}` : `${BASE_URL}/api/`;
  console.log(`GET ${requestUrl} for user: ${session.user ? session.user.username : 'N/A'}`);

  return new Promise((resolve, reject) => {
    return axios.get(requestUrl, headers)
    .then(result => resolve(result.data))
    .catch((err) => {
      console.log(err);
      return reject(err);
    });
  });
};

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
        .then((subscriptions) => {
          console.log('subscriptions ', subscriptions.data);
          return resolve(subscriptions.data);
        })
        .catch(err => reject(err));
    }
    return resolve([]);
  });
};

const prepPostListView = (context) => {
  const title = !context.query.sub || context.query.sub === 'null' ? 'Matryoshka: Internet, Stacked' : context.asPath;
  const subreddit = !context.query.sub || context.query.sub === 'null' ? null : context.query.sub;

  return new Promise((resolve, reject) => {
    const response = {
      title,
      subreddit,
    };
    return auth.initializeSession(context)
      .then((session) => {
        response.user = session.user;
        response.token = session.token;
        return getSubscriptions(session);
      })
      .then((subscriptions) => {
        response.subscriptions = subscriptions;
        return getPosts({ user: response.user, token: response.token }, subreddit);
      })
      .then((posts) => {
        response.posts = posts;
        return resolve(response);
      })
      .catch(err => reject(err));
  });
};

const prepPostDetailView = (context) => {
  const title = !context.query.sub || context.query.sub === 'null' ? 'Matryoshka: Internet, Stacked' : context.asPath;
  const subreddit = !context.query.sub || context.query.sub === 'null' ? null : context.query.sub;

  return new Promise((resolve, reject) => {
    const response = {
      title,
      subreddit,
      post: {},
      comments: [],
    };
    return auth.initializeSession(context)
      .then((session) => {
        response.user = session.user;
        response.token = session.token;
        return getSubscriptions(session);
      })
      .then((subscriptions) => {
        response.subscriptions = subscriptions;
        return resolve(response);
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  getPosts,
  prepPostListView,
  prepPostDetailView,
  subscribe,
  getSubscriptions,
};
