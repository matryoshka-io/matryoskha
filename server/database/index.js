const mongoose = require('mongoose');
const { MONGO_URI } = require('../../app.config');

mongoose.connect(`${MONGO_URI}`);
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error connecting to database.  Retrying in 3 seconds');
  setTimeout(() => mongoose.connect(`${MONGO_URI}`), 3000);
});

db.once('open', () => {
  console.log('Mongoose successfully connected to MongoDB');
});

module.exports = db;
