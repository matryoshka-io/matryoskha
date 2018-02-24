module.exports = (req, res, next) => {
  if (req.session !== null) {
    next();
  }
};
