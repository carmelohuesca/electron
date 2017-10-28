const router = require('../router');
const HomeController = require('./home.controller');

router.get('/home', HomeController.home);

module.exports = router;