const router = require('../router');
const UsersController = require('./users.controller');

router.get('/users', UsersController.list);
router.get('/users/me', UsersController.me);
router.get('/users/count', UsersController.count);
router.get('/users/:id', UsersController.read);
router.post('/users', UsersController.create);
module.exports = router;