const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send('Microservice Started!'));
// router.get('**', (req, res) => res.status(200).send('Microservice Started!'));

module.exports = router;