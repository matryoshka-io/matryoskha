const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/matryoksha');
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error connecting to database.  Retrying in 3 seconds');
  setTimeout(() => mongoose.connect('mongodb://mongo/matryoksha'), 3000);
});

db.once('open', () => {
  console.log('Mongoose successfully connected to MongoDB');
});

module.exports = db;
