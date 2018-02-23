module.exports = (req, res, next) => {
  req.session.username = 'admin';
  next();
};
