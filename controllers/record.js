const Joi = require('joi');
const _ = require('lodash');
const logger = require('../utils/logger');
const RecordModel = require('../models/record');

/**
 * Filter data using aggregated strategy
 *
 *
 * @param req
 * @param res
 * @returns {object} json response
 */
/* eslint consistent-return: 0 */
const index = (req, res) => {
  const schema = Joi.object({
    startDate: Joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).required(),
    endDate: Joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required(),
  });

  const result = schema.validate(req.body, { abortEarly: false });

  if (typeof result.error !== 'undefined') {
    /**
     * Response with validation errors
     * P.S. records key omitted here and all unsuccessful requests.
     * In task wasn't mentioned about records key in unsuccessful request/response
     */
    return res.status(422).json({
      code: 422,
      msg: _.map(result.error.details, (msg) => _.replace(msg.message, /"/g, '')),
    });
  }

  const filters = result.value;

  RecordModel.findAggregated(filters).then((records) => res.json({
    code: 0,
    msg: 'Success',
    records,
  })).catch((error) => {
    logger.error('Error: ', error);

    return res.status(500).json({
      code: 500,
      msg: 'Something went wrong...',
    });
  });
};

module.exports.index = index;
