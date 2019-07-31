const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
  name:         { type: String, required: true },
  description:  { type: String },
  date:         { type: Date, default: Date.now },
  user:         { type: String }
});

module.exports = mongoose.model('Group', GroupSchema);
