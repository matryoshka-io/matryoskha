const home = require('./home');
const subreddit = require('./subreddit');
const auth = require('./auth');

// Split by HTTP method later, e.g.
// sub.POST, and sub.GET, and so on.
module.exports = {
  home,
  subreddit,
  auth,
};
