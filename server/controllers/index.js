const getHomepage = require('./getHomepage');
const createSubreddit = require('./createSubreddit');

// Split by HTTP method later, e.g.
// sub.POST, and sub.GET, and so on.
module.exports = {
  getHomepage,
  createSubreddit,
};
