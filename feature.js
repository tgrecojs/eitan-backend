const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const featuresSchema = new Schema({
   features: String
});

module.exports = mongoose.model('feature', featuresSchema);
