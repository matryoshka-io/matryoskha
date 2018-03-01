const addPageRoutes = (server, app) => {
  // Public Views
  server.get('/r/:sub/posts/:post/comments/:comment', (req, res) => {
    app.render(req, res, '/comment', req.params);
  });

  server.get('/r/:sub/posts/:post', (req, res) => {
    app.render(req, res, '/post', req.params);
  });

  server.get('/r/:sub', (req, res) => {
    console.log(`[GET]: ${req.url}`, req.params);
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

  server.get('/', (req, res) => {
    app.render(req, res, '/frontpage', req.params);
  });
};

module.exports = addPageRoutes;
