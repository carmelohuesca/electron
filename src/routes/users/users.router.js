const router = require('../router');
const UsersController = require('./users.controller');

router.get('/users', UsersController.list);
router.get('/users/me', UsersController.me);
router.get('/users/count', UsersController.count);
router.get('/users/:id', UsersController.read);
router.delete('/users/:id', UsersController.delete);
router.post('/users', UsersController.create);
router.put('/users/:id', UsersController.update);

module.exports = router;