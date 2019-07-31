const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  date:       { type: Date, default: Date.now },
  lastname1:  { type: String },
  lastname2:  { type: String },
  document:   { type: String },
  id_b:       { type: String },
  code:       { type: String },
  phone:      { type: String },
  movil:      { type: Number },
  img:        { type: String },
  rol:        { type: String, default: "Empleado" },
  group:      { type: String },
  brands:     { type: String },
  shifts: {
    shiftId:{ type:String },
    title:  { type:String},
    status: { type:Boolean},
    date:   { type: Date, default: Date.now },
    update: { type: Date}
  },
  status :    { type: String }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
