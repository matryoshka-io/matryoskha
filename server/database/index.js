const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/matryoksha');

const db = mongoose.connection;

const Link = require('../models/Link');
const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Vote = require('../models/Vote');

const data = JSON.parse(require('./data.json'));

db.on('error', function (error) {
  console.log('Error connnecting to database: ' + error);
});

db.once('open', function () {
  console.log('Mongoose successfully connected to MongoDB');
  console.log('Inserting dummy data');

  // for (const link in data[])
});

module.exports = db;
