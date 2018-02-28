module.exports = (req, res, next) => {
  req.session = {
    user: {},
  };
  next();
};
