const express = require('express');

const { tracksController } = require('../controllers');

const router = express.Router();

router.get('/playlists/:playlistId/tracks', tracksController.getTracks);

module.exports = router;
