const mongoose = require('mongoose');
const { Schema } = mongoose;

const CalendarSchema = new Schema({
    employeeid: { type: String, required: true },
    title: { type: String },
    shift: { type: Boolean, default: false },
    shiftid: { type: String },
    description: { type: String },
    start: { type: Date },
    end: { type: Date },
    breakstart: { type: String },
    breakend: { type: String },
    breaktime: { type: String },
    allDay: { type: String },
    groupId: { type: String },
    overlap: { type: String },
    rendering: { type: String },
    color: { type: String },
    url: { type: String },
    rrule: {
        dtstart: { type: String },
        freq: { type: String },
        interval: { type: Number },
        until: { type: String },
        byweekday: {}
    },
    duration: { type: String },
    constraint: { type: String },
    status: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('Calendar', CalendarSchema);