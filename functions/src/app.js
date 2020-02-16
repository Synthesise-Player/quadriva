require('dotenv').config();

const express = require('express');
const cors = require('cors');
const v1Routes = require('./v1/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', v1Routes);
app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;
