const express = require('express');
const router = express.Router();
const moment = require('moment');

// Models
const Employee = require('../models/User');
const Brand = require('../models/Brand');
const Group = require('../models/Group');
const Shift = require('../models/Shift');
const Calendar = require('../models/Calendar');

// Helpers
const { isAuthenticated } = require('../helpers/auth');
const Dur = require('../helpers/duration');

// New employee
router.get('/employees/add', isAuthenticated, async(req, res) => {
    const brands = await Brand.find();
    const groups = await Group.find();
    res.render('employees/new-employee', { brands, groups });
});

router.post('/employees/new-employee', isAuthenticated, async(req, res) => {
    if (req.file != null) { req.body.img = '/uploads/' + req.file.filename; };
    const newEmployee = new Employee(req.body);
    newEmployee.password = await newEmployee.encryptPassword(req.body.email);
    try {
        const result = await newEmployee.save();
        req.flash('success_msg', 'Empleado Agregado Satisfactoriamente');
        res.redirect('/employees');
    } catch (err) {
        console.log(err.message);
        res.render('employees/new-employee', {
            newemployee
        });
        req.flash('error', err.message);
    }
});

// Get All employees
router.get('/employees', isAuthenticated, async(req, res) => {
    const employees = await Employee.find({ rol: "Empleado" });
    res.render('employees/employees', { employees });
});

// Get employee
router.get('/employees/show/:id', isAuthenticated, async(req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.render('employees/show', { employee });
});

// Edit employees
router.get('/employees/edit/:id', isAuthenticated, async(req, res) => {
    const employee = await Employee.findById(req.params.id);
    const brands = await Brand.find();
    res.render('employees/edit-employee', { employee, brands });
});

router.put('/employees/edit/:id', isAuthenticated, async(req, res) => {
    if (req.file != null) {
        req.body.logo = '/uploads/' + req.file.filename;
    }
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'employee Updated Successfully');
    res.redirect('/employees');
});

// Delete employees
router.delete('/employees/delete/:id', isAuthenticated, async(req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'employee Deleted Successfully');
    res.redirect('/employees');
});

//Shift Employee Show
router.post('/employees/shift', async(req, res) => {
    var shift = await Calendar.findOne({
        employeeid: req.body.id,
        shift: true,
        function(err, shift) {
            if (err) { return handleError(err); } else { return shift; }
        }
    });
    if (shift) {
        sh = await Shift.findById(shift.shiftid);
        res.send({ 'result': true, 'data': sh });
    } else {
        var shifts = await Shift.find();
        res.send({ 'result': false, 'data': shifts });
    }
});

//Shift Employee add
router.post('/employees/shift/add', async(req, res) => {
    var sh = await Calendar.findOne({
        employeeid: req.body.employeeid,
        shift: true,
        status: true,
        function(err, calendar) {
            if (err) { return handleError(err); }
        }
    });
    if (!sh) {
        var shift = await Shift.findById(req.body.shift);
        var d = new Date();
        d.setHours(shift.start.substr(0, 2))
        d.setMinutes(shift.start.substr(4, 6));
        d.setSeconds(00);
        d.setMilliseconds(0);
        req.body.start = d.toJSON();
        req.body.shift = true;
        req.body.shiftid = shift._id;
        req.body.duration = Dur(shift.start, shift.end);
        req.body.rendering = "background";
        req.body.rrule = {
            freq: 'dayly',
            dtstart: req.body.start,
            byweekday: shift.days
        };
        const newCalendar = new Calendar(req.body);
        try {
            const result = await newCalendar.save();
            req.flash('success_msg', 'Evento Agregado');
            res.send(result);
        } catch (err) {
            console.log(err.message);
            req.flash('error', err.message);
        }
    }
});

/* Shift deactivate */
router.post('/employees/shift/deactivate', async(req, res) => {
    var sh = await Calendar.findOne({
        employeeid: req.body.id,
        shift: true,
        status: true,
        function(err, calendar) {
            if (err) { return handleError(err); } else { return sh; }
        }
    });
    if (sh) {
        await Calendar.findByIdAndUpdate(sh._id, { status: false });
        req.flash('success_msg', 'Turno Desactivado');
        var shifts = await Shift.find();
        res.send({ 'result': true, 'data': shifts });
    }
});

//event add
router.post('/employees/calendar/add', async(req, res) => {
    if (req.body.freq != null) {
        req.body.rrule = {
            'dtstart': req.body.dtstart,
            'freq': req.body.freq
        }
    };
    const newCalendar = new Calendar(req.body);
    console.log(req.body.rrule);
    try {
        const result = await newCalendar.save();
        req.flash('success_msg', 'Evento Agregado');
        res.send(result);
    } catch (err) {
        console.log(err.message);
        req.flash('error', err.message);
    }
});

//event move
router.post('/employees/calendar/move', async(req, res) => {
    var event = await Calendar.findByIdAndUpdate(req.body.id, req.body);
    res.send('Evento actualizado')
});

// events
router.get('/employees/calendar/:id', isAuthenticated, async(req, res) => {
    const events = await Calendar.find({ employeeid: req.params.id, status: true });
    res.send(JSON.stringify(events));
});


module.exports = router;