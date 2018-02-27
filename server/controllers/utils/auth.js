const User = require('../../models/User');
const webtoken = require('jsonwebtoken');
const webtokenRefresh = require('jsonwebtoken-refresh');
const crypto = require('crypto');

const tokenSecret = 'aa69bd0db71d34f400d981b89aeff7f2';
const tokenExpiration = 7 * 60 * 60;

const createUser = (username, password) =>
  new Promise((resolve, reject) => {
    User
      .findOne({ username })
      .exec()
      .then((foundUser) => {
        if (foundUser !== null) {
          return foundUser;
        }
        const createUser = new User({ username, password });
        return createUser.save();
      })
      .then(newUser => resolve(newUser))
      .catch(err => reject(err));
  });

const authenticateUser = (username, password) =>
  new Promise((resolve, reject) => {
    const result = {};
    return User
      .findOne({ username })
      .exec()
      .then((foundUser) => {
        if (foundUser === null) {
          result.user = null;
          return false;
        }
        result.user = foundUser;
        return foundUser.comparePassword(password);
      })
      .then((isMatch) => {
        console.log(isMatch);
        result.isValid = isMatch;
        result.message = isMatch ? 'Credentials are valid' : 'Credentials provided are invalid';
        return resolve(result);
      })
      .catch((err) => {
        result.isValid = false;
        result.message = 'Error, user could not be verified';
        return reject(result);
      });
  });

const generateToken = user =>
  webtoken.sign(
    {
      user,
      xsrfToken: crypto
        .createHash('md5')
        .update(user.username)
        .digest('hex'),
    },
    tokenSecret,
    {
      expiresIn: tokenExpiration,
    },
  );

const verifyToken = token =>
  new Promise((resolve, reject) => {
    webtoken.verify(token, tokenSecret, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });

// is only synchronous
// const decodeToken = token =>
//   new Promise((resolve, reject) => {
//     webtoken.decode(token, { complete: true }, (err, decoded) => {
//       if (err) return reject(err);
//       return resolve(decoded);
//     });
//   });

const refreshToken = token =>
  new Promise((resolve, reject) => {
    const decodedToken = webtoken.decode(token, { complete: true });
    webtokenRefresh.refresh(decodedToken, tokenExpiration, tokenSecret, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });

module.exports = {
  createUser,
  authenticateUser,
  generateToken,
  verifyToken,
  refreshToken,
};
