const express = require('express');

const root = require('./root.route');
const search = require('./search.route');

const router = express.Router();

router.use('/', root);
router.use('/search', search);

module.exports = router;
