const { spotifyService } = require('../services');

const getTracks = async (req, res) => {
  const { playlistId } = req.params;
  const questions = await spotifyService.getPlaylistTracks(playlistId);
  res.status(200).send(questions);
};

module.exports = {
  getTracks,
};
