const path = require('path');
const winston = require('winston');
const config = require('../../config');

const logger = winston.createLogger({
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: path.join(config.logger.directory, '/application.log') }),
  ],
});

if (config.env !== 'production') {
  logger.add(new winston.transports.Console({
    handleExceptions: true,
    colorize: true,
    timestamp: true,
    level: config.logger.level,
    format: winston.format.simple(),
  }));
}

module.exports = logger;
