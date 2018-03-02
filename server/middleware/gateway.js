module.exports = (req, res, next) => {
  console.log('API GATEWAY: ', req.session);
  if (req.session.user) {
    next();
  } else {
    res.status(401).end('You must be logged in to do this!');
  }
};
