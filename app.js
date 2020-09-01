const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const http = require('http').createServer(app);

const config = require('./config');
const logger = require('./utils/logger');
const logRequests = require('./utils/logger/log-requests');

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

// Log requests into file
app.use(logRequests);

// error handler
app.use((err, req, res, next) => {
  logger.error('Error', err);

  res.status(500).json({
    code: 500,
    msg: 'Something went wrong...',
  });
});

// Connect mongo
require('./utils/db/mongo');

http.listen(config.server.port, (err) => {
  if (err) {
    logger.error(err);
  }

  console.log(`listening on *:${config.server.host}:${config.server.port}`);

  /* eslint-disable */
  fs.readdirSync(path.join(__dirname, 'routes')).map((file) => {
    require(`./routes/${file}`)(app);
  });

  // 404
  app.use(function(req, res, next) {
    return res.status(404).send({ code: 404, msg: 'Page Not found.' });
  });
});



module.exports = app;
