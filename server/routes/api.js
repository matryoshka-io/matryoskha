const router = require('express').Router();

const db = require('../database');
const models = require('../models');

// API ROUTES

router.get('/', function (req, req) {
  res.status(404).end('Not found!');
});

module.exports = router;