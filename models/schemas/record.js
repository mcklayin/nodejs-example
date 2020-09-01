const mongoose = require('mongoose');
const config = require('../../config');

const { Schema } = mongoose;
const RecordSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    counts: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { collection: 'records', timestamps: false },
);

RecordSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

RecordSchema.index({ createdAt: -1 });

if (config.env !== 'production') {
  mongoose.set('debug', true);
}

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
