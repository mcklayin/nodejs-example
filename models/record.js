const RecordModel = require('./schemas/record');

/**
 * Find records using aggregation framework
 *
 * @param {object} filters
 * @returns {Promise<Aggregate>}
 */
const findAggregated = async (filters) => RecordModel.aggregate([
  {
    $match: {
      createdAt: { $gt: new Date(filters.startDate), $lt: new Date(filters.endDate) },
    },
  },
  {
    $project: {
      _id: 0,
      key: 1,
      createdAt: 1,
      totalCount: {
        $sum: '$counts',
      },
    },
  },
  {
    $match: {
      totalCount: { $gt: filters.minCount, $lt: filters.maxCount },
    },
  },
]);

module.exports.findAggregated = findAggregated;
