module.exports = (req, res, next) => {
  req.session.user = {
    username: 'ken',
    _id: '5a8e0e077f911450d4600d96',
  };
  next();
};
