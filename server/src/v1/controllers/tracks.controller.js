const { spotifyService } = require('../services');

module.exports = {
  getTracks: spotifyService.getPlaylistTracks,
};
