const mongoose = require('mongoose');
const slugify = require('slugify');

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
  titleSlug: {
    type: String,
    unique: true,
  },
});

subredditSchema.pre('save', function CreateSlugFromTitle(next) {
  // Hopefully there are no collisions in terms of uniqueness. e.g. 'Cats' and 'cats' are different, but
  // both resolve to 'cats'. This 'save' thing should throw an error, we'll see.
  this.titleSlug = slugify(this.title, {
    replacement: '-',
    remove: /[$*_+~.()'"!\-:@]/g,
    lower: true,
  });
  next();
});

const Subreddit = mongoose.model('Subreddit', subredditSchema);

module.exports = Subreddit;
