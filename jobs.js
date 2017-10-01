const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const JobsSchema = new Schema({
  title: String,
  company: String,
  location: String,
  createdBy: String
});

module.exports = mongoose.model('Job', JobsSchema);
