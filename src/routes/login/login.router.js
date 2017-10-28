const router = require('../router');
const app = require('../../server').app;

const LoginController = require('./login.controller');

router.post('/login', LoginController.localLogin);



module.exports = router;