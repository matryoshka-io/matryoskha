const home = require('./home');
const subreddit = require('./subreddit');
const post = require('./post');
const comment = require('./comment');
const vote = require('./vote');
const user = require('./user');
const subscription = require('./subscription');
const auth = require('./auth');

module.exports = {
  home,
  subreddit,
  post,
  comment,
  user,
  vote,
  subscription,
  auth,
};
