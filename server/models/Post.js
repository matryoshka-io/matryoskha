const mongoose = require('mongoose');
const slugify = require('slugify');

// This model doubles as both a Post and a Comment.
// If it's a top-level comment, its parent is a Post, and it has no Subreddit property, title property, type property, and so on.
// If it's a Post, it has no parent and its Subreddit property is not-empty, its title and type properties are not-empty, and so on.
// If it's a nested comment, its parent is another Comment and it has no Subreddit property, and so on.
// Etc.

// The unique ID for a Post/Comment will be MongoDB's default _id, autogenerated.
const postSchema = mongoose.Schema({
  subreddit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subreddit',
  }, // Unique ID of the Subreddit to which the Post belongs.
  title: String, // Title of the Post.
  type: String, // Type of the Post/Comment, e.g. Video, Image (e.g. an IMGUR link), Text, Comment. Videos and Images are links.
  body: String, // Body of the Post/Comment, if applicable.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // Unique ID of the User to which this Post/Comment belongs.
  date: {
    type: Date,
    default: Date.now,
  }, // Self-explanatory.
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }, // See above for top-level Comments, vs. nested Comments, vs. Posts.
  url: String,
  titleSlug: String, // For the title.
});

postSchema.pre('save', function (next) {
  this.titleSlug = slugify(this.title);
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
