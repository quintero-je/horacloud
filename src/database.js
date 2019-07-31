const mongoose = require('mongoose');

var db = process.env.MONGOURI || 'mongodb://localhost/horacloud-db';

mongoose.set('useFindAndModify', false);
mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));