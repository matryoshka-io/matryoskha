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
    signup: (req, res) => {

    },
  },
};
