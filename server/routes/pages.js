const addPageRoutes = (server, app) => {
  // Public Views

  // :comment is a unique ID, so /r/:comment is actually feasible.
  // Only usernames (for users) and subreddit names are unique strings.
  // This allows us to query users and subreddits by their names.
  // Post titles are not unique, since there can be more than one post
  // with the same title.
  //
  // Comments don't have titles.
  //
  // It is therefore feasible to have:
  //  /r/:comment
  //  /r/:post
  //  /r/:sub
  //
  // Unfortunately, these are all the same pattern, so in reality.
  // The intermediary query params would all be trashed.
  // Or, we could restructure it.
  server.get('/c/:comment', (req, res) => {
    app.render(req, res, '/comment', req.params);
  });

  server.get('/p/:post', (req, res) => {
    console.log('oh la')
    app.render(req, res, '/post', req.params);
  });

  server.get('/r/:sub', (req, res) => {
    app.render(req, res, '/frontpage', req.params);
  });

  server.get('/', (req, res) => {
    app.render(req, res, '/frontpage', req.params);
  });

  // All User lists views are indicated by a :content param
  // getInitialProps will submit the appropriate query based on the content type requested
  // content :: posts, comments, subscriptions, subreddits
  // default :: posts
  server.get('/u/:name/:content', (req, res) => {
    app.render(req, res, '/user/profile', req.params);
  });

  server.get('/u/:name', (req, res) => app.render(req, res, '/user/profile', req.params));

  // Auth
  server.get('/u/login', (req, res) => {
    app.render(req, res, '/user/login', req.params);
  });

  server.get('/u/signup', (req, res) => {
    app.render(req, res, '/signup', req.params);
  });
};

module.exports = addPageRoutes;
