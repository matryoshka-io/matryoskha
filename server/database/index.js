const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/matryoksha');

const db = mongoose.connection;

const Link = require('../models/Link');
const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Vote = require('../models/Vote');

const models = {
  Link,
  Post,
  Subreddit,
  Subscription,
  User,
  Vote,
};

let data = require('./data.json');
data = JSON.parse(data);

db.on('error', function (error) {
  console.log('Error connnecting to database: ' + error);
});

db.once('open', function () {
  console.log('Mongoose successfully connected to MongoDB');
  console.log('Inserting dummy data');

  const modelNames = Object.keys(models);
  const promises = [];
  for (const modelName of modelNames) {
    for (const fakeData of data[modelName]) {
      const newData = new models[modelName](fakeData);
      promises.push(newData.save());
    }
  }
  Promise.all(promises).then(function () {
    console.log('Insertion of dummy data complete!');
  });
});

module.exports = db;
