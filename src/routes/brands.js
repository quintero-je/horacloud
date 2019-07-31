const express = require('express');
const router = express.Router();

// Models
const Brand = require('../models/Brand');
const Token = require('../models/Token');
const Employees = require('../models/User');

// Helpers
const { isAuthenticated } = require('../helpers/auth');
const Moment = require('moment');

// New brand
router.get('/brands/add', isAuthenticated, (req, res) => {
    res.render('brands/new-brand');
});

router.post('/brands/new-brand', isAuthenticated, async(req, res) => {
    if (req.file != null) {
        req.body.logo = '/uploads/' + req.file.filename;
    }
    const newbrand = new Brand(req.body);
    newbrand.user = req.user.id;

    try {
        const result = await newbrand.save();
        req.flash('success_msg', 'brand Added Successfully');
        res.redirect('/brands');
    } catch (err) {
        console.log(err.message);

        res.render('brands/new-brand', {
            newbrand
        });
        req.flash('error', err.message);
    }
});

// Get All brands
router.get('/brands', isAuthenticated, async(req, res) => {
    const brands = await Brand.find({ user: req.user._id }).sort({ date: 'desc' });
    res.render('brands/brands', { brands });
});

// Get brand and show
router.get('/brands/show/:id', isAuthenticated, async(req, res) => {
    var brand = await Brand.findById(req.params.id);
    var token = await Token.find({ brand: req.params.id, status: true }).sort({ date: 'asc' });
    var employees = await Employees.find({ brands: req.params.id }).sort({ date: 'asc' });
    res.render('brands/show', { brand, token, employees });
});


// Edit brands
router.get('/brands/edit/:id', isAuthenticated, async(req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.render('brands/edit-brand', { brand });
});

router.put('/brands/edit/:id', isAuthenticated, async(req, res) => {
    if (req.file != null) {
        req.body.logo = '/uploads/' + req.file.filename;
    }
    await Brand.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'brand Updated Successfully');
    res.redirect('/brands/show/' + req.params.id);
});

/* Delete brands */
router.delete('/brands/delete/:id', isAuthenticated, async(req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'brand Deleted Successfully');
    res.redirect('/brands');
});

/* Brand Token Geneate */
router.post('/brands/token/generate', isAuthenticated, async(req, res) => {
    var token = await Token.findOne({
        brand: req.body.brand,
        function(err, token) {
            if (err) { return handleError(err) } else { return token }
        }
    });
    if (!token) {
        obj = new Token(req.body);
        obj = await obj.save();
        res.send(obj.token);
    }
    return false;
});

/* Brand Token Show */
router.post('/brands/token/show', isAuthenticated, async(req, res) => {
    var today = new Date;
    try {
        var t = await Token.find({
                brand: req.body.brand
            }).where('date')
            .gt(Moment(today).add(-7, 'd'))
            .lt(today);
        if (t[0] != null) {
            res.send({ 'data': t[0], 'status': true })
        } else {
            res.send({ 'data': null, 'status': false })
        }

    } catch (err) {
        console.log(err.message)
        res.send(false)
    }


});


//ajax requests
router.post('/brands/req/:id/:model/:action', isAuthenticated, async(req, res) => {

    var obj = null;
    switch (req.params.action) {
        case 'find':
            obj = await req.params.model.findById(req.params.id);
            res.json(obj);
            break;

        case 'update':
            obj = await req.params.model.findByIdAndUpdate(req.params.id, req.body);
            res.json(obj);
            break;

        case 'create':
            var model = Object.prototype.toString.call(req.params.model);
            obj = new Token(req.body);
            obj = await obj.save();
            res.send(obj.token);
            break;


        default:
            obj = "error de envío de data";
            res.send('error');
            break;
    }
});

module.exports = router;