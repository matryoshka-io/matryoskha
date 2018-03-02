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
        return getPosts(session, subreddit);
      })
      .then((posts) => {
        response.posts = posts;
        return resolve(response);
      })
      .catch(err => reject({
        title,
        subreddit,
        user: null,
        token: null,
        posts: [],
      }));
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
        return resolve(response);
      })
      .catch(err => reject({
        title,
        subreddit,
        user: null,
        token: null,
        post: {},
        comments: [],
      }));
  });
}

module.exports = {
  getPosts,
  prepPostListView,
  prepPostDetailView,
};
