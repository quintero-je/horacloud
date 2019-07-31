const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  employee: { type: String,required: true },
  ip: { type: String, required: true },
  date: { type: Date,  default: Date.now },
  type: { type: String}
});

module.exports = mongoose.model('Note', NoteSchema);
