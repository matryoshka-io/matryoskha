const mongoose = require('mongoose');

// The unique ID for a Subscription will be MongoDB's default _id, autogenerated.
// This likely won't be used however. Since the "primary key" will be a combination of a User ID and a Subreddit ID.

// This is a join table. A User can be subscribed to many Subreddits, and a Subreddit can have many subscribers, who are Users.
const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subreddit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subreddit',
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
