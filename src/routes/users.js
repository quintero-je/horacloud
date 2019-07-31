const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');
const Brand = require('../models/Brand');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.');
      res.redirect('/users/signup');
    } else {
      // Saving a New User
      const newUser = new User(req.body);
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'User registered.');
      res.redirect('/users/signin');
    }
  }
});

// New user
router.get('/users/new-user', isAuthenticated, async (req, res) => {
  const brands = await Brand.find();
  res.render('users/new-user',{ brands});
});

router.post('/users/new-user', isAuthenticated, async (req, res) => {
  if(req.file != null){
    req.body.img = '/uploads/' + req.file.filename;
  }
  req.body.rol = "Admin"
  const newUser = new User(req.body);
  newUser.password = await newUser.encryptPassword(req.body.email);

  try {
    const result = await newUser.save();
    req.flash('success_msg', 'user Added Successfully');
    res.redirect('/users');
  } catch (err) {
      console.log(err.message);
      
        res.render('users/new-user', {
          newuser
        });
        req.flash('error', err.message);
  }
});

// Edit users
router.get('/users/edit/:id', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.params.id);
  const brands = await Brand.find();
/*   if(user.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/users');
  }  */
  res.render('users/edit-user', { user, brands });
});

router.put('/users/edit/:id', isAuthenticated, async (req, res) => {
  if(req.file != null){
    req.body.logo = '/uploads/' + req.file.filename;
  }
  await User.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success_msg', 'user Updated Successfully');
  res.redirect('/users');
});

// Get All Admin Users
router.get('/users/admin', isAuthenticated, async (req, res) => {
  const users = await User.find({rol: "Admin"});
  res.render('users/users', { users });
});

// Get user
router.get('/users/profile', isAuthenticated, async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  res.render('users/show', { user });
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/brands',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/');
});

module.exports = router;
