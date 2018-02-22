const home = require('./home');
const subreddit = require('./subreddit');

// Split by HTTP method later, e.g.
// sub.POST, and sub.GET, and so on.
module.exports = {
  home,
  subreddit,
};
