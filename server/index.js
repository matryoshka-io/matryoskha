const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: './client', dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // middleware & auth

    // routes
    server.get('*', (req, res) => handle(req, res));

    // start server
    server.listen(3000, (err) => {
      console.log('MATRYOSHKA ARE STACKING on :3000');
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });