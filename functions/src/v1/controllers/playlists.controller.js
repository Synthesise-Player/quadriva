const { spotifyService } = require('../services');

const getPlaylist = async (req, res) => {
  const { id } = req.params;
  const playlist = await spotifyService.getPlaylist(id);
  res.status(200).send(playlist);
};

module.exports = {
  getPlaylist,
};
