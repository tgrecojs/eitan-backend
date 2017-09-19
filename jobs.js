const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const JobsSchema = new Schema({
  position: String,
  company: String,
  location: String,
  skills: [String]
});

module.exports = mongoose.model('Job', JobsSchema);
