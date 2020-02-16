const express = require('express');

const { questionsController } = require('../controllers');

const router = express.Router();

router.post('/', questionsController.getQuestions);

module.exports = router;
