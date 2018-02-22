const User = require('../models/User');
const webtoken = require('jsonwebtoken');
const crypto = require('crypto');

const tokenSecret = 'aa69bd0db71d34f400d981b89aeff7f2';

const createUser = (username, password) => {
  return new Promise((resolve, reject) => {
    User
      .find({ username })
      .exec()
      .then((foundUser) => {
        if (foundUser) {
          return resolve(null);
        }
        return new User({ username, password }).save();
      })
      .then(newUser => resolve(newUser))
      .catch(err => reject(new Error('Failed to create user')));
  });
};

const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    User
      .findOne({ username })
      .exec()
      .then((foundUser) => {
        if (!foundUser) return false;
        return User.comparePassword(password);
      })
      .then(isMatch => resolve(isMatch))
      .catch(err => reject(err));
  });
};

const generateToken = (username) => {
  return webtoken.sign(
    {
      username,
      xsrfToken: crypto
        .createHash('md5')
        .update(username)
        .digest('hex'),
    },
    tokenSecret,
    {
      expiresIn: 60 * 60,
    },
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    webtoken.verify(token, tokenSecret, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};

module.exports = {
  createUser,
  authenticateUser,
  generateToken,
  verifyToken,
};
