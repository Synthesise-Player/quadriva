const { getPlaylistTracks, getRecommendations } = require('./spotify.service');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

const generateIncorrectAnswers = (n) => {
  const random = [1, 1, 1].map((_) => getRandomInt(-5, 5));
  return random.map((r) => r + n);
};

const getIncorrectSongTitles = async (artistId, trackId) => {
  const { tracks } = await getRecommendations(artistId, trackId);
  return tracks.slice(0, 3).map(({ name }) => name);
}

const getYearQuestion = (track) => {
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
};

const getTitleQuestion = async (track) => {
  const { album: { images }, id, preview_url: previewUrl, name, artists } = track;
  const incorrectAnswers = await getIncorrectSongTitles(artists[0].id, id);
  return {
    id,
    message: 'What is the title of this song?',
    previewUrl,
    answer: name,
    incorrectAnswers,
    imgUrl: images[0].url,
  };
};

const getQuestions = async (playlistId) => {
  const response = await getPlaylistTracks(playlistId);
  const validTracks = response.tracks.items.slice(0, 20)
    .filter(({ track }) => track.preview_url);
  const questionTypes = [getYearQuestion, getTitleQuestion];
  return Promise.all(validTracks.map(({ track }) => {
    const i = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[i](track);
  }));
};

module.exports = {
  getQuestions,
};
