const port = 5000;

// For debug
// console.log('process.env');
// console.log(process.env);
// console.log('port', port);
// console.log('process.env.REACT_APP_SERVER_LOCATION');
// console.log(process.env.REACT_APP_SERVER_LOCATION);

const origins = {
  local: `http://localhost:${port}/quadrivia-ed25a/us-central1`,
  cloud: `https://us-central1-quadrivia-ed25a.cloudfunctions.net`,
};

// const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'local';
const serverLocation = 'local';

const origin = origins[serverLocation];

console.log(`Client expects server at origin: ${origin}`);

module.exports = {
  origin,
};
