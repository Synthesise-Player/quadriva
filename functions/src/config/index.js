const functions = require('firebase-functions');

const port = 5000;

const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'cloud';

const spotifyCredentials = {
  local: () => ({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  }),
  cloud: () => ({
    clientId: functions.config().spotify.id,
    clientSecret: functions.config().spotify.secret,
  }),
};

console.log(`Server is at location: ${serverLocation}`);

module.exports = {
  port,
  spotifyCredentials: spotifyCredentials[serverLocation](),
};
