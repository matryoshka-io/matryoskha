const mongoose = require('mongoose');
const { MONGO_URI } = require('../../app.config');

mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.dropDatabase();

const Post = require('../models/Post');
const Subreddit = require('../models/Subreddit');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Vote = require('../models/Vote');

const models = {
  User,
  Subreddit,
  Post,
  Subscription,
  Vote,
};

const data = require('./data.json');

db.on('error', (err) => {
  console.log(`Error connecting to database: ${err}`);
});

db.once('open', () => {
  console.log('Mongoose successfully connected to MongoDB');
  console.log('Inserting dummy data');

  const modelNames = Object.keys(models);
  const promises = [];
  modelNames.forEach((modelName) => {
    data[modelName].forEach((fakeData) => {
      promises.push(new models[modelName](fakeData).save());
    });
  });

  Promise.all(promises).then(() => {
    console.log('Insertion of dummy data complete!');
    process.exit();
  }).catch((err) => {
    console.log(`Error when inserting data: ${err}`);
    process.exit();
  });
});

module.exports = db;
