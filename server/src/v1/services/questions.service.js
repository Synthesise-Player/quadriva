const { getRecommendations, getRecommendedArtists } = require('./spotify.service');

function shuffle(arr) {
  const a = arr;
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

const generateIncorrectAnswers = (n) => {
  const random = [1, 1, 1].map(() => getRandomInt(-5, 5));
  return random.map((r) => r + n);
};

const getIncorrectSongTitles = async (artistId, trackId) => {
  const { tracks } = await getRecommendations(artistId, trackId);
  return tracks.slice(0, 3).map(({ name }) => name);
};

const getIncorrectArtists = async (artistId) => {
  const { artists } = await getRecommendedArtists(artistId);
  return shuffle(artists).slice(0, 3).map(({ name }) => name);
};

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
  const {
    album: { images },
    id,
    preview_url: previewUrl,
    name,
    artists,
  } = track;
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

const getArtistQuestion = async (track) => {
  const {
    album: { images },
    id,
    preview_url: previewUrl,
    artists: [artist],
  } = track;
  const incorrectAnswers = await getIncorrectArtists(artist.id);
  return {
    id,
    message: 'Which artist does this track belong too?',
    previewUrl,
    answer: artist.name,
    incorrectAnswers,
    imgUrl: images[0].url,
  };
};

const getRandomQuestionGenerator = () => {
  const questionTypes = [getYearQuestion, getTitleQuestion, getArtistQuestion];
  return questionTypes[Math.floor(Math.random() * questionTypes.length)];
};

const getQuestions = (track) => getRandomQuestionGenerator()(track);

module.exports = {
  getQuestions,
};
