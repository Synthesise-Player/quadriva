const express = require('express');

const root = require('./root.route');
const search = require('./search.route');
const questions = require('./questions.route');

const router = express.Router();

router.use('/', questions);
router.use('/search', search);
router.use('/', root);

module.exports = router;
