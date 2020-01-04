const express = require('express');

const { questionsController } = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
  const { track } = req.body;
  const questions = await questionsController.getQuestions(track);
  // const d2 = new Date();
  // console.log(3, d2.getTime());
  res.status(200).send(questions);
});

module.exports = router;
