require('dotenv').config({ path: './.env' });
const path = require('path');

module.exports = {
  app_url: process.env.APP_URL || 'http://localhost:3030',
  env: process.env.NODE_ENV || 'development',
  mongo: {
    uri: process.env.MONGO_URI || '',
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3030,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    directory: process.env.LOGGER_DIRECTORY || path.join(__dirname, '../logs'),
  },
};
