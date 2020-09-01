const expressWinston = require('express-winston');
const path = require('path');
const winston = require('winston');
const config = require('../../config');

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(config.logger.directory, '/requests.log') }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true, // log meta data
  msg: 'HTTP {{req.method}} {{req.url}}', // "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true,
  colorize: false,
});
