const { getRecommendations, getRecommendedArtists } = require('./spotify.service');

function shuffle(arr) {
  const a = arr;
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor(max - min)) + min;

const getIncorrectYears = (correctYear) => {
  const maxDifferential = 7;
  const currentYear = new Date().getFullYear();
  const maxYear = Math.min(currentYear, correctYear + maxDifferential);
  const minYear = correctYear - maxDifferential;
  const lowerBound = getRandomInt(minYear, maxYear - maxDifferential);
  const upperBound = lowerBound + maxDifferential;

  const incorrectAnswers = new Set();
  while (incorrectAnswers.size < 3) {
    const r = getRandomInt(lowerBound, upperBound);
    if (r !== correctYear) incorrectAnswers.add(r);
  }
  return [...incorrectAnswers];
};

const getIncorrectSongTitles = async (artistId, trackId) => {
  const { tracks } = await getRecommendations(artistId, trackId);
  return tracks.slice(0, 3).map(({ name }) => name);
};

const getIncorrectAlbums = async (artistId, trackId, albumName) => {
  const { tracks } = await getRecommendations(artistId, trackId);
  const albums = new Set(tracks.map(({ album: { name } }) => name));
  return [...albums].filter((name) => name !== albumName).slice(0, 3);
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
    incorrectAnswers: getIncorrectYears(releaseYear),
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

const getAlbumQuestion = async (track) => {
  const {
    album: { images, name: albumName },
    id: trackId,
    preview_url: previewUrl,
    artists: [artist],
  } = track;
  const incorrectAnswers = await getIncorrectAlbums(artist.id, trackId, albumName);
  return {
    trackId,
    message: 'Which album does this track belong too?',
    previewUrl,
    answer: albumName,
    incorrectAnswers,
    imgUrl: images[0].url,
  };
};

const getRandomQuestionGenerator = () => {
  const questionTypes = [
    getYearQuestion,
    getTitleQuestion,
    getArtistQuestion,
    getAlbumQuestion,
  ];
  return questionTypes[getRandomInt(0, questionTypes.length)];
};

const getQuestions = track => getRandomQuestionGenerator()(track);

module.exports = {
  getQuestions,
};
