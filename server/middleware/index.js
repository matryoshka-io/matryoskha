const auth = require('../controllers/utils/auth');

const validateSession = (req, res, next) => {
  const token = req.get('x-access-token');
  if (token) {
    console.log('TOKEN CHECK: ');
    auth.verifyToken(token)
      .then((decoded) => {
        req.session = {
          user: decoded.user,
        };
        console.log('... token valid ', req.session.user);
        next();
      })
      .catch((err) => {
        console.log('... token invalid');
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
