const express = require('express');
const router = express.Router();

// Models
const Group = require('../models/Group');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Group
router.get('/groups/add', isAuthenticated, (req, res) => {
  res.render('groups/new-group');
});

router.post('/groups/new-group', isAuthenticated, async (req, res) => {
  const { name, description } = req.body;
  const errors = [];
  if (!name) {
    errors.push({text: 'Please Write a name.'});
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('groups/new-group', {
      errors,
      name,
      description
    });
  } else {
    const newGroup = new Group({name, description});
    newGroup.user = req.user.id;
    await newGroup.save();
    req.flash('success_msg', 'Group Added Successfully');
    res.redirect('/groups');
  }
});

// Get All Groups
router.get('/groups', isAuthenticated, async (req, res) => {
  const groups = await Group.find({user: req.user.id}).sort({date: 'desc'});
  res.render('groups/groups', { groups });
});

// Edit Groups
router.get('/groups/edit/:id', isAuthenticated, async (req, res) => {
  const group = await Group.findById(req.params.id);
  if(group.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/groups');
  } 
  res.render('groups/edit-group', { group });
});

router.put('/groups/edit-group/:id', isAuthenticated, async (req, res) => {
  const { name, description } = req.body;
  await Group.findByIdAndUpdate(req.params.id, {name, description});
  req.flash('success_msg', 'Group Updated Successfully');
  res.redirect('/groups');
});

// Delete Groups
router.delete('/groups/delete/:id', isAuthenticated, async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Group Deleted Successfully');
  res.redirect('/groups');
});

module.exports = router;
