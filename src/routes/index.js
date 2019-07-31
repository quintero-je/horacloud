const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');
const Token = require('../models/Token');
const Moment = require('moment');
const Employee = require('../models/User')

router.get('/', (req, res) => {
    res.render('index');
    console.log(req.ips);
});

router.post('/', (req, res) => {
    req.flash('error', 'Para registrar check esta ventana debe ser abierta desde el panel de control del usuario administrador, por favor solicite el link al supervisor.');
    res.redirect('/');
})

router.get('/check/:token/:brand', async(req, res) => {
    var token = await Token.findById(req.params.token);
    var today = new Date;
    if (Moment(token.date).add(7, 'd').toJSON() <= today.toJSON()) {
        req.flash('error', 'Token vencido,por favor comuníquese con su supervisor para generar un nuevo link');
        res.render('index');
    } else {
        res.render('index');
    };
});

router.post('/check/:token/:brand', async(req, res) => {
    var token = await Token.findById(req.params.token);
    var emp = await Employee.findOne({ document: req.body.id });
    var today = new Date;
    if (emp == null) {
        req.flash('error', 'El empleado no se encuentra registrado,por favor verifique el número de documento')
        res.redirect('back');
    } else {
        if (Moment(token.date).add(7, 'd').toJSON() <= today.toJSON()) {
            req.flash('error', 'Token vencido,por favor comuníquese con su supervisor para generar un nuevo link');
            res.redirect('back');
        } else {
            var c = await check(emp._id);
            req.flash('success_msg', 'Fichaje registrado, gracias ' + emp.name)
            res.redirect('back')
        };
    }

});

async function check(emp) {

    var cal = await Calendar.find({ employeeid: emp, title: 'Jornada Laboral Iniciada' });
    var today = new Date;
    if (!cal[0]) {
        var chk = new Calendar({
            'employeeid': emp,
            start: today.toJSON(),
            title: 'Jornada Laboral Iniciada',
            color: '#257e4a'
        });
        var result = await chk.save();
        return await result;
    } else {
        s = new Moment(cal[0].start);
        e = new Moment(cal[0].end);
        var x = Moment.duration(s.diff(e, 'hours'));
        console.log(x);
        var chk = await Calendar.findByIdAndUpdate(cal[0]._id, {
            end: today.toJSON(),
            title: 'Jornada Laboral Culminada'
        });
        return await chk;
    };



};

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;