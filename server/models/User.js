const mongoose = require('mongoose');

// The unique ID for a User will be MongoDB's default _id, autogenerated.
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  }, // Username for the User in question, must be unique. Not the "primary key," however.
  password: String, // This must be hashed, we think sessions will be done with npm – express-session and npm – bcrypt.
  // Sketch below. Users and Subs is a many-to-many relationship.
  subs: [Number], // Array of unique IDs which refer to the Subs to which a User is subscribed.
});               // In essence, to the get the amount of Users a Sub has, we have to check all the Users.
