const auth = require('../controllers/utils/auth');

const validateSession = (req, res, next) => {
  const token = req.get('x-access-token');
  if (token) {
    auth.verifyToken(token)
      .then((decoded) => {
        req.session = decoded;
        next();
      })
      .catch((err) => {
        req.session = null;
        next();
      });
  } else {
    req.session = null;
    next();
  }
};

module.exports = {
  validateSession,
};
