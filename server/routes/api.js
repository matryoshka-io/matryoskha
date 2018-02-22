const router = require('express').Router();

const db = require('../database');
const models = require('../models');

router.get('/', function (req, res) {
  console.log('got a req');
  models.Post.find({ type: { $not: /Comment/ }}).then(function (posts) {
    res.status(200).end(JSON.stringify(posts));
  });
});

module.exports = router;