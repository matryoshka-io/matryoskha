const express = require('express');
const next = require('next');

// nextjs environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: './client', dev});

// route handlers
const apiRoutes = require('./routes').api;
const addPageRoutes = require('./routes').pages;
const nextHandler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // middleware & auth

    // routes
    server.use('/api', apiRoutes);
    addPageRoutes(app);
    server.get('*', (req, res) => nextHandler(req, res));

    // start server
    server.listen(3000, (err) => {
      console.log('MATRYOSHKA ARE STACKING ON: 3000');
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
