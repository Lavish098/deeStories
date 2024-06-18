const express = require('express')
const passport  = require('passport')
const router = express.Router()
const path = require('path')
const User = require('../models/User')
const bcrypt = require("bcrypt");



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard')
})

router.post('/signup', async (req, res) => {
    const { lastName, firstName, email, password } = req.body;
  try {
    let user = await User.findOne({email})
    if(user){
      req.flash('error_msg', 'User already exists');
      return res.redirect('/');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ displayName: lastName + ' ' + firstName, lastName, firstName, email, password: hashedPassword });

    req.login(user, (err) => {
      if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ error: 'Login after signup failed', details: err.message });
      }
      res.redirect('/dashboard'); // Redirect to the dashboard or any protected route
  });

  } catch (err) {
    req.flash('error_msg', 'Something went wrong. Please try again');
  }
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/',  failureFlash: true }),
  (req, res) => {
    res.redirect('/dashboard');
  });

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err){ return next(err)}
        res.redirect('/')
    })
})
module.exports = router