const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/matryoksha');
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`Error connecting to database: ${err}`);
});

db.once('open', () => {
  console.log('Mongoose successfully connected to MongoDB');
});

module.exports = db;
