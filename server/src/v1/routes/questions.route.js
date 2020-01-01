const express = require('express');

const { questionsController } = require('../controllers');

const router = express.Router();

router.get('/playlists/:playlistId/questions', async (req, res) => {
  const { playlistId } = req.params;
  const questions = await questionsController.getQuestions(playlistId);
  res.status(200).send(questions);
});

module.exports = router;
