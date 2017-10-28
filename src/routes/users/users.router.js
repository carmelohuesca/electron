const router = require('../router');
const UsersController = require('./users.controller');

router.get('/users', UsersController.list);
router.get('/users/:id', UsersController.read);

module.exports = router;