const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

// Next.js Environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });

// Middleware
const sessions = require('./middleware/index').validateSession;

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
    server.use(sessions);

    // Testing
    // server.use(fakeSession);
    // server.use(fakeLogin);

    // Static assets
    // Might be able to do just express.static('static'),
    // also, what about the auth for static assets.
    // Can all unauthorized users get all images? Probably.
    // I mean, they can see all posts and comments and subreddits,
    // they just can't post anything themselves.
    //
    // There's also no need, necessarily, for /static, as long we
    // put this middleware BEFORE the page routes. If we don't
    // put this middleware before the page routes, then the page
    // might look for /r/default.jpg, which Express will pick up as
    // our GET to /r/:sub route.
    //
    // In the past, the /r/null issue wasn't replicable on the homepage,
    // i.e. /, because there was no pattern that matched /null.
    // So Next.js' fallback handler/route just trashed that request, I'm assuming.
    //
    // CSS relative paths for "background" and all that.
    server.use('/static', express.static(path.join(__dirname, 'static')));

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
