require('dotenv').config();

const express = require('express');
const cors = require('cors');
const v1Routes = require('./v1/routes');

const app = express();
const port = 4200;

app.use(cors());

app.use('/api/v1/', v1Routes);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
