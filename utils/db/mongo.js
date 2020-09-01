const mongoose = require('mongoose');
const config = require('../../config');
const logger = require('../logger');

// mongoose.Promise = global.Promise;

let isConnectedBefore = false;
const connect = () => mongoose.connect(config.mongo.uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  auto_reconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 1000,
});
const connection = connect();

connection
  .then((db) => {
    logger.info(
      `Successfully connected to ${config.mongo.uri} MongoDB cluster in ${config.env} mode.`,
    );
    return db;
  })
  .catch((err) => {
    if (err.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      connect();
    } else {
      logger.error('Error while attempting to connect to database:');
      logger.error(err);
    }
  });

mongoose.connection.on('error', () => {
  logger.error('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  logger.error('Lost MongoDB connection...Trying reconnect');

  if (!isConnectedBefore) {
    connect();
  }
});
mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  logger.info('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', () => {
  logger.info('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Force to close the MongoDB connection');
    logger.error('Force to close the MongoDB connection');
    process.exit(0);
  });
});

module.exports = connection;
