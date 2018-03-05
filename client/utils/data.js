const axios = require('axios');

const auth = require('./auth');

const { BASE_URL } = require('../../app.config');

const getPosts = (session, subreddit = null, offset = 0) => {
  const headers = session.user ? auth.makeTokenHeader(session.token) : {};
  const requestUrl = subreddit !== null ? `${BASE_URL}/api/sub/${subreddit}` : `${BASE_URL}/api/`;
  console.log(`GET ${requestUrl} for user: ${session.user ? session.user.username : 'N/A'}`);

  return new Promise((resolve, reject) => {
    return axios.get(requestUrl, headers)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
  });
};

const subscribe = (session, subreddit) => {
  if (session.user && session.token && subreddit) {
    return new Promise((resolve, reject) => {
      const requestUrl = `${BASE_URL}/api/subscription/${subreddit}`;
      const headers = auth.makeTokenHeader(session.token);
      return axios.post(requestUrl, {}, headers)
        .then(result => resolve(true))
        .catch(err => reject(err));
    });
  }
  return false;
};

const unsubscribe = (session, subreddit) => {
  if (session.user && session.token && subreddit) {
    return new Promise((resolve, reject) => {
      const requestUrl = `${BASE_URL}/api/subscription/${subreddit}`;
      const headers = auth.makeTokenHeader(session.token);
      return axios.delete(requestUrl, headers)
        .then((result) => {
          console.log('Unsubscribed');
          return resolve(true);
        })
        .catch((err) => {
          console.log('Unsubscribe error: \n', err);
          return reject(err);
        });
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

const prepPostListView = (context) => {
  const title = !context.query.sub || context.query.sub === 'null' ? 'Matryoshka: Internet, Stacked' : context.asPath;
  const subreddit = !context.query.sub || context.query.sub === 'null' ? null : context.query.sub;

  return new Promise((resolve, reject) => {
    const response = {
      title,
      subreddit,
      user: null,
      token: null,
      subscribed: false,
      posts: [],
    };
    return auth.initializeSession(context)
      .then((session) => {
        response.user = session.user;
        response.token = session.token;
        return getSubscriptions(session);
      })
      .then((subscriptions) => {
        response.subscribed = subscriptions.some(subscription => subscription.subreddit.titleSlug === subreddit);
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
  unsubscribe,
  getSubscriptions,
};
