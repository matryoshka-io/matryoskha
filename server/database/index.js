const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/matryoksha');

const db = mongoose.connection;

db.on('error', function (error) {
  console.log('Error connnecting to database: ' + error);
});

db.once('open', function () {
  console.log('Mongoose successfully connected to MongoDB');

  const testSchema = mongoose.Schema({
    date: {
      type: Date,
      default: Date.now,
    }
  });

  const DateModel = mongoose.model('Date', testSchema);
  const newDate = new DateModel();

  newDate.save().then(function (date) {
    console.log(date);
  });
});

module.exports = db;
