const router = require('express').Router();
const auth = require('../utils/auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  auth.authenticateUser(username, password)
    .then((isValid) => {
      if (!isValid) {
        res.status(403).send({
          success: false,
          token: null,
          message: 'Invalid credentials',
        });
      }
      const userToken = auth.generateToken(username);
      res.status(200).send({
        success: true,
        token: userToken,
        message: 'Successfully Authenticated',
      });
    });
});

router.post('/logout');

router.post('/signup');
