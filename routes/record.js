const Record = require('../controllers/record');

module.exports = (api) => {
  api.route('/records').post(Record.index);
};
