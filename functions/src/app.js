require('dotenv').config();

const express = require('express');
const cors = require('cors');
const v1Routes = require('./v1/routes');


const { port } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', v1Routes);
app.get('/', (req, res) => res.send('Hello World!'));
if (process.env.REACT_APP_SERVER_LOCATION === 'local') {
  app.listen(port, () => console.log(`Listening on port ${port}!`));
}

module.exports = app;
