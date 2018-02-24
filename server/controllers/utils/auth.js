const User = require('../../models/User');
const webtoken = require('jsonwebtoken');
const crypto = require('crypto');

const tokenSecret = 'aa69bd0db71d34f400d981b89aeff7f2';

const createUser = (username, password) =>
  new Promise((resolve, reject) => {
    User
      .findOne({ username })
      .exec()
      .then((foundUser) => {
        console.log('FOUNDUSER: ', foundUser);
        if (foundUser !== null) {
          return foundUser;
        }
        const createUser = new User({ username, password });
        console.log('CREATE USER: ', createUser);
        return createUser.save();
      })
      .then((newUser) => {
        console.log('NEWUSER: ', newUser);
        return resolve(newUser);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });

const authenticateUser = (username, password) =>
  new Promise((resolve, reject) => {
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

const generateToken = username =>
  webtoken.sign(
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

const verifyToken = token =>
  new Promise((resolve, reject) => {
    webtoken.verify(token, tokenSecret, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });

module.exports = {
  createUser,
  authenticateUser,
  generateToken,
  verifyToken,
};
