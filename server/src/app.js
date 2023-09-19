const express = require('express');
const cors = require('cors');
const routes = require('./infrastructure/router');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('tmp'));
app.use(`/`, routes);
app.use(bodyParser.json({ limit: '50mb' }));
app.set('trust proxy', true);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);
app.use(function (req, res, next) {
  const allowedOrigins = [, 'http://localhost:3000'];
  const origin = req.headers.origin || '';
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => console.log(`Ready...${port}`));
