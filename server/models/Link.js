const mongoose = require('mongoose');

// The unique ID for a Link will be MongoDB's default _id, autogenerated.
const linkSchema = mongoose.Schema({
  type: String, // e.g. Article, Video, Image
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  metadata: Object, // e.g. if an Image, then post a preview, if an article, post a snippet.
});  

const Link = mongoose.model('Link', linkSchema);
