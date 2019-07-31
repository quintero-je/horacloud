const mongoose = require('mongoose');
const { Schema } = mongoose;
const Moment = require('moment');

const TokenSchema = new Schema({
    brand: {
        type: String,
    },
    token: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
    }
});

module.exports = mongoose.model('Token', TokenSchema);