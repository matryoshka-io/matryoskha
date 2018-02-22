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
    promises.push(models[modelName].remove());
  }
  
  Promise.all(promises).then(function () {
    const finalPromises = [];
    for (const fakeData of data[modelName]) {
      finalPromises.push(new models[modelName](fakeData).save());
    }
    Promise.all(finalPromises).then(function () {
      console.log('Insertion of dummy data complete!');
      process.exit();
    }).catch(function (error) {
      console.log(error);
      console.log('Error when inserting dummy data: ' + error);
      process.exit();
    })
  }).catch(function (error) {
    console.log('Error when clearing collection: ' + data);
    process.exit();
  });
});

module.exports = db;
