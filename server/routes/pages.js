const router = require('express').Router();

const addPageRoutes = (app) => {

  router.get('/', (req, res) => {
    const page = '/index';
    const queryParams = { };
    app.render(req, res, page, queryParams);
  });

  router.get('/r/:sub', (req, res) => {
    const page = "/subreddit";
    const queryParams = { subreddit: req.params.sub };
    app.render(req, res, page, queryParams);
  });

  router.get("/r/:sub/:post", (req, res) => {
    const page = "/post";
    const queryParams = { subreddit: req.params.sub, post: req.params.post };
    app.render(req, res, page, queryParams);
  });

  router.get("/r/:sub/:post/:comment", (req, res) => {
    const page = "/comment";
    const queryParams = { subreddit: req.params.sub, post: req.params.post, comment: req.params.comment };
    app.render(req, res, page, queryParams);
  });

};

module.exports = addPageRoutes;