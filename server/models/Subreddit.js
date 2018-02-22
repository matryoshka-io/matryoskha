const mongoose = require('mongoose');

// The unique ID for a Subreddit will be MongoDB's default _id, autogenerated.
const subredditSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // ID of the User who created this Subreddit.
  description: String, // Description of the Subreddit.
  title: {
    type: String,
    unique: true,
  }, // Title of the Subreddit, serves as the /r/title as well.
  date: {
    type: Date,
    default: Date.now,
  }, // Self-explanatory.
});

const Subreddit = mongoose.model('Subreddit', subredditSchema);

module.exports = Subreddit;
