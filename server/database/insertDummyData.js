const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/matryoksha');

const db = mongoose.connection;

// const Link = require('../models/Link');
const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Vote = require('../models/Vote');

const models = {
  // Link,
  Post,
  Subreddit,
  Subscription,
  User,
  Vote,
};

const data = require('./data.json');

db.on('error', function (error) {
  console.log('Error connnecting to database: ' + error);
});

db.once('open', function () {
  console.log('Mongoose successfully connected to MongoDB');
  console.log('Inserting dummy data');

  const modelNames = Object.keys(models);
  const promises = [];
  for (const modelName of modelNames) {
    models[modelName].remove().then(function (response) {
      for (const fakeData of data[modelName]) {
        promises.push(new models[modelName](fakeData).save());
      }
    }).catch(function (error) {
      console.log('Error when clearing collection: ' + error);
    });
  }
  
  Promise.all(promises).then(function () {
    console.log('Insertion of dummy data complete!');
  }).catch(function (error) {
    console.log('Error when inserting data: ' + data);
  });
});

module.exports = db;
