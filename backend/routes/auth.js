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
    console.log(req.body);
    const { lastName, firstName, email, password } = req.body;
    console.log(lastName, firstName, email, password);
  try {
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({ error: 'User already exists' });
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
    res.status(400).json(err);
  }
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
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