const User = require('../models/User');
const auth = require('./utils/auth');

module.exports = {
  POST: {
    login: (req, res) => {
      const { username, password } = req.body;
      auth.authenticateUser(username, password)
        .then((isValid) => {
          if (!isValid) {
            res
              .status(403)
              .send({
                success: false,
                token: null,
                message: 'Invalid credentials',
              });
          }
          const userToken = auth.generateToken(username);
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
            const userToken = auth.generateToken(newUser.username);
            const userValues = {
              _id: newUser._id,
              username: newUser.username,
            };
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
