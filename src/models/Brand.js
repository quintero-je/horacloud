const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name:         { type: String, required: true },
  document:     { type: String, required: true },
  address:      { type: String, required: true },
  url:          { type: String },
  logo:         { type: String },
  description:  { type: String },
  template:     { type: String },
  date:         { type: Date, default: Date.now },
  user:         { type: String, required: true }
});

module.exports = mongoose.model('Brand', BrandSchema);
