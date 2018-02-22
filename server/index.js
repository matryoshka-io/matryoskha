const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

// Next.js Environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: './client', dev});

// Route handlers
const apiRoutes = require('./routes').api;

app.prepare()
  .then(() => {
    const server = express();

    // Middleware & Auth
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    // Routes
    server.use('/api', apiRoutes);
    const pageRoutes = require('./routes').pages(server, app);

    // Fallback Route
    const nextHandler = app.getRequestHandler();
    server.get('*', (req, res) => nextHandler(req, res));

    // Start the server
    server.listen(3000, (err) => {
      console.log('MATRYOSHKA ARE STACKING ON: 3000');
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
