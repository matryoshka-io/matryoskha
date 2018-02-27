const User = require('../models/User');
const auth = require('./utils/auth');

module.exports = {
  POST: {
    authenticateToken: (req, res) => {
      const token = req.get('x-access-token');
      console.log('authenticating token: ', token);
      if (!token) {
        res.status(200).send({});
        return;
      }
      const response = {};
      auth.verifyToken(token)
        .then((content) => {
          console.log('successfully verified ', content);
          response.content = content;
          return auth.refreshToken(token);
        })
        .then((refreshed) => {
          console.log('successfully refreshed ', refreshed);
          response.token = refreshed;
          response.session = true;
          res.status(200).send(response);
        })
        .catch((err) => {
          response.content = null;
          response.token = null;
          response.session = false;
          console.log('token invalid, response: \n', response);
          console.log('error \n', err);
          res.status(400).send(response);
        });
    },
    login: (req, res) => {
      console.log('Login \n', req.body);
      const { username, password } = req.body;
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
            return;
          }
          const userValues = {};
          userValues._id = result.user._id;
          userValues.username = result.user.username;

          const userToken = auth.generateToken(userValues);
          res
            .status(200)
            .send({
              success: true,
              user: userValues,
              token: userToken,
              message: 'Successfully Authenticated',
            });
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              success: false,
              user: null,
              token: null,
              message: 'Authentication Error',
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
