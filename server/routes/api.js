const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getHomepage);

router.post('/sub', controllers.createSubreddit);

module.exports = router;
