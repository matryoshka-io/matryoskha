const router = require('express').Router();
const db = require('../database');

// API ROUTES

router.get('/', function (req, req) {
  res.status(404).end('Not found!');
});

module.exports = router;