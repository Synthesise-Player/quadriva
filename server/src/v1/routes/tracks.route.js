const express = require('express');

const { tracksController } = require('../controllers');

const router = express.Router();

router.get('/playlists/:playlistId/tracks', async (req, res) => {
  const { playlistId } = req.params;
  const questions = await tracksController.getTracks(playlistId);
  res.status(200).send(questions);
});

module.exports = router;
