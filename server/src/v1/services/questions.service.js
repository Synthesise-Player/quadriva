const { getPlaylistTracks } = require('./spotify.service');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

const generateIncorrectAnswers = (n) => {
  const random = [1, 1, 1].map((_) => getRandomInt(-5, 5));
  return random.map((r) => r + n);
};

const getQuestions = async (playlistId) => {
  const response = await getPlaylistTracks(playlistId);
  return response.tracks.items
    .filter(({ track }) => track.preview_url)
    .map(({ track }) => {
      const { album: { release_date: releaseDate, images }, id, preview_url: previewUrl } = track;
      const releaseYear = new Date(releaseDate).getFullYear();
      return {
        id,
        message: 'What year was this album released?',
        previewUrl,
        answer: releaseYear,
        incorrectAnswers: generateIncorrectAnswers(releaseYear),
        imgUrl: images[0].url,
      };
    });
};

module.exports = {
  getQuestions,
};
