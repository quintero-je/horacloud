const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShiftSchema = new Schema({
  name:         { type: String, required: true },
  description:  { type: String },
  start:        { type: String, required: true },
  breaktime :   { type: String},
  end:          { type: String},
  days:         { type: Array}, 
  date:         { type: Date, default: Date.now },
  user:         { type: String }
});

module.exports = mongoose.model('Shift', ShiftSchema);
