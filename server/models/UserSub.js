const mongoose = require('mongoose');

// The unique ID for a UserSub will be MongoDB's default _id, autogenerated.
// This likely won't be used however. Since the "primary key" will be a combination of a User ID and a Sub ID.

// This is a join table. A User can be subscribed to many Subs, and a Sub can have many subscribers, who are Users.
const userSubSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sub',
  },
});  
