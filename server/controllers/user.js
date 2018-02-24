const db = require('../database');
const models = require('../models');

const utils = require('./utils');

// Get date joined?
module.exports = {
  karma: {
    GET(req, res) {
      models.User.findOne({ username: req.params.username })
        .then((user) => {
          res.status(200).json({ karma: user.karma });
        });
    },
  },
};
