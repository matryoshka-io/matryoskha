const User = require('../models/User');
const auth = require('./utils/auth');

module.exports = {
  POST: {
    authenticateToken: (req, res) => {
      const token = req.get('x-access-token');
      if (!token) {
        res.status(200).send({});
        return;
      }
      auth.verifyToken(token)
        .then(decoded => res.status(200).send(decoded))
        .catch(err => res.status(200).send({}));
    },
    login: (req, res) => {
      console.log('hello');
      const { username, password } = req.body;
      console.log(`USER LOGIN REQUEST, ${username}`);
      auth.authenticateUser(username, password)
        .then((result) => {
          if (!result.isValid) {
            res
              .status(403)
              .send({
                success: false,
                token: null,
                message: result.message,
              });
          }
          const userValues = {};
          userValues._id = result.user._id;
          userValues.username = result.user.username;

          const userToken = auth.generateToken(userValues);
          res
            .status(200)
            .send({
              success: true,
              token: userToken,
              message: 'Successfully Authenticated',
            });
        });
    },
    logout: (req, res) => {

    },
    register: (req, res) => {
      const { username, password } = req.body;
      auth.createUser(username, password)
        .then((newUser) => {
          if (newUser) {
            const userValues = {
              _id: newUser._id,
              username: newUser.username,
            };
            const userToken = auth.generateToken(userValues);
            res
              .status(200)
              .send({
                success: true,
                user: userValues,
                token: userToken,
                message: 'User and session created',
              });
          } else {
            res
              .status(403)
              .send({
                success: false,
                token: null,
                message: 'User creation failed.  User already exists',
              });
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              success: false,
              token: null,
              message: 'An error occurred in signup request.',
            });
        });
    },
  },
};
