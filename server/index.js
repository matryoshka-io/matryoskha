const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Next.js Environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });

// Middleware
const tokenCheck = require('./middleware/index').validateSession;

// Route handlers
const authRoutes = require('./routes').auth;
const apiRoutes = require('./routes').api;
const addPageRoutes = require('./routes').pages;

// Testing
// const fakeSession = require('./middleware/fakeSession');
// const fakeLogin = require('./middleware/fakeLogin');

app.prepare()
  .then(() => {
    const server = express();

    // Middleware & Auth
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(tokenCheck);

    // Testing
    // server.use(fakeSession);
    // server.use(fakeLogin);

    // Routes
    server.use('/auth', authRoutes);
    server.use('/api', apiRoutes);
    addPageRoutes(server, app);

    // Fallback Route
    const nextHandler = app.getRequestHandler();
    server.get('*', (req, res) => nextHandler(req, res));

    // Start the server
    server.listen(3000, (err) => {
      server.keepAliveTimeout = 0;
      if (err) {
        console.log(`Error starting server: ${err}`);
      } else {
        console.log('MATRYOSHKA ARE STACKING ON: 3000');
      }
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
