const port = 5000;

const origins = {
  local: `http://localhost:${port}/v1`,
  cloud: 'https://us-central1-quadrivia-ed25a.cloudfunctions.net/api/v1',
};

const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'cloud';
const origin = origins[serverLocation];

console.log(`Client expects server at origin: ${origin}`);

module.exports = {
  origin,
};
