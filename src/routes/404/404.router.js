const router = require('../router');
const NotFoundController = require('./404.controller');

router.get('/404', NotFoundController.notFound);
router.get('/**', NotFoundController.notFound);

module.exports = router;