const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// nextjs environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: './client', dev});

// middleware
const sessions = require('./middleware/index').validateSession;

// route handlers
const authRoutes = require('./routes').auth;
const apiRoutes = require('./routes').api;
const addPageRoutes = require('./routes').pages;

app.prepare()
  .then(() => {
    const server = express();

    // middleware & auth
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(sessions);

    // routes
    server.use('/auth', authRoutes);
    server.use('/api', apiRoutes);
    addPageRoutes(server, app);

    // fallback route
    const nextHandler = app.getRequestHandler();
    server.get('*', (req, res) => nextHandler(req, res));

    // start server
    server.listen(3000, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('MATRYOSHKA ARE STACKING ON: 3000');
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
