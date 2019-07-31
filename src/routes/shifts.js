const express = require('express');
const router = express.Router();

// Models
const Shift = require('../models/Shift');
const Days = {mo:'Lun',tu:'Mar',we:'Mie',th:'Jue',fr:'Vie',sa:'Sab',su:'Dom'};

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New shift
router.get('/shifts/add', isAuthenticated, (req, res) => {
  res.render('shifts/new-shift');
});

router.post('/shifts/new-shift', isAuthenticated, async (req, res) => {
  if(req.file != null){
    req.body.logo = '/uploads/' + req.file.filename;
  }
  const newshift = new Shift(req.body);
  newshift.user = req.user.id;

  try {
    const result = await newshift.save();
    req.flash('success_msg', 'shift Added Successfully');
    res.redirect('/shifts');
  } catch (err) {
      console.log(err.message);
      
        res.render('shifts/new-shift', {
          newshift
        });
        req.flash('error', err.message);
  }
});

// Get All shifts
router.get('/shifts', isAuthenticated, async (req, res) => {
  const shifts = await Shift.find({user: req.user.id}).sort({date: 'desc'});
  res.render('shifts/shifts', { shifts});
});

// Edit shifts
router.get('/shifts/edit/:id', isAuthenticated, async (req, res) => {
  const shift = await Shift.findById(req.params.id);
  res.render('shifts/edit-shifts', { shift });
});

router.put('/shifts/edit/:id', isAuthenticated, async (req, res) => {
  if(req.days != null){
    req.days
  }else{ req.days = null}
  await Shift.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success_msg', 'shift Updated Successfully');
  res.redirect('/shifts');
});

// Delete shifts
router.delete('/shifts/delete/:id', isAuthenticated, async (req, res) => {
  await Shift.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'shift Deleted Successfully');
  res.redirect('/shifts');
});

module.exports = router;
