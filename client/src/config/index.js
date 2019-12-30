const port = 4200;

// For debug
// console.log('process.env');
// console.log(process.env);
// console.log('port', port);
// console.log('process.env.REACT_APP_SERVER_LOCATION');
// console.log(process.env.REACT_APP_SERVER_LOCATION);

const origins = {
//   cloud: 'https://reunite.eu-gb.cf.appdomain.cloud',
  local: `http://localhost:${port}`,
//   'local-network': `http://169.254.XXX.XX:${port}`, // Set this to your Private IP address
};

// const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'local';
const serverLocation = 'local';

const origin = origins[serverLocation];

console.log(`Client expects server at origin: ${origin}`);

module.exports = {
  origin,
};
