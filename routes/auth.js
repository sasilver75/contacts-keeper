const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config'); // For JWT Secret
const auth = require('../middleware/auth');

const User = require('../models/User') // Mongoose User model

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private 
// NOTE: '/' corresponds to api/auth in this file
router.get('/', auth, (req,res) => {
  res.send("Get logged in user!");
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
// NOTE: '/' corresponds to api/auth in this file
router.post('/', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req,res) => {
  // Check for errors in the validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }


  const { email, password } = req.body;

  try {
    // Try to see if user exists.
    //  If it doesn't, return 400...
    let user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials"});
    }

    // If a user was found, compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: 'Invalid Credentials'});
    }

    // If the user is found and it DOES match, we're going to send back a JWT token.
    const payload = {
      user: {
        id: user.id
      }
    }

    // Sign the JWT. Use the payload and the jwtSecret from default.json, and set the expiry to an hour.
    jwt.sign(payload, config.get('jwtSecret'), { 
      expiresIn: 36000
    }, (err, token) => {
      if (err) throw err;
      // Send that shit back
      res.json({token});
    });


  } catch(err) {
    console.error(err.message);
    res.status(500).send('Sever Error');
  }


});


module.exports = router;