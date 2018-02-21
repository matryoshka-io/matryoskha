const mongoose = require('mongoose');

// The unique ID for a Vote will be MongoDB's default _id, autogenerated.
const voteSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }, // Unique ID for the Post/Comment on which this Vote is placed.
  date: {
    type: Date,
    default: Date.now,
  }, // Date for when this Vote was placed.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // Unique ID for the User who created/voted this Vote.
  value: Number, // If -1 it's a downvote, if 1 it's an upvote.
});

const Vote = mongoose.model('Vote', voteSchema);
