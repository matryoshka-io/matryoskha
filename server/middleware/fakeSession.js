module.exports = (req, res, next) => {
  req.session = {};
  next();
};
