const addPageRoutes = (server, app) => {
  // Public Views
  server.get('/r/:sub/:post/:comment', (req, res) => {
    const queryParams = {
      subreddit: req.params.sub,
      post: req.params.post,
      comment: req.params.comment,
    };
    app.render(req, res, '/comment', queryParams);
  });

  server.get('/r/:sub/:post', (req, res) => {
    const queryParams = { subreddit: req.params.sub, post: req.params.post };
    app.render(req, res, '/post', queryParams);
  });

  server.get('/r/:sub', (req, res) => {
    const queryParams = { subreddit: req.params.sub };
    app.render(req, res, '/subreddit', queryParams);
  });

  // All User lists views are indicated by a :content param
  // getInitialProps will submit the appropriate query based on the content type requested
  // content :: posts, comments, subscriptions, subreddits
  // default :: posts
  server.get('/u/:name/:content', (req, res) => {
    const queryParams = { name: req.params.name, content: req.params.content };
    app.render(req, res, '/user/profile', queryParams);
  });

  server.get('/u/:name', (req, res) => app.render(req, res, '/user/profile', req.params));

  // Auth
  server.get('/u/login', (req, res) => {
    app.render(req, res, '/user/login', req.params);
  });

  server.get('/u/signup', (req, res) => {
    app.render(req, res, '/user/signup', req.params);
  });

  server.get('/', (req, res) => {
    const queryParams = {};
    app.render(req, res, '/index', queryParams);
  });
};

module.exports = addPageRoutes;
