const auth = require('../controllers/utils/auth');

const validateSession = (req, res, next) => {
  const token = req.get('x-access-token');
  if (token) {
    auth.verifyToken(token)
      .then((decoded) => {
        console.log('Session from header: ', decoded.user);
        req.session = {
          user: decoded.user,
        };
        next();
      })
      .catch((err) => {
        req.session = {
          user: null,
        };
        next();
      });
  } else {
    req.session = {
      user: null,
    };
    next();
  }
};

module.exports = {
  validateSession,
};
