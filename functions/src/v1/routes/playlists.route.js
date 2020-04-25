const express = require('express');

const { playlistsController } = require('../controllers');

const router = express.Router();

router.get('/:id', playlistsController.getPlaylist);

module.exports = router;
