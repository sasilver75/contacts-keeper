const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config'); // For JWT Secret


const User = require('../models/User') // Mongoose User model

// @route   POST api/users
// @desc    Register a user
// @access  Public
// NOTE: '/' corresponds to api/users in this file
// Check takes the property on res that 
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  // Passed Validation
  const { name, email, password } = req.body;
  try {
    // Check whether a user with that email already exists
    let user = await User.findOne({email: email});
    if (user) {
      return res.status(400).json({ msg: "User already exists"})
    }

    // Create new user. Hasn't set been saved to DB.
    user = new User({
      name,
      email,
      password
    })

    // Using bcrypt, hash the password of the new user.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Begin creating a JWT to send back to the user! :)
    // Payload is the object that you want to send in the token.
    // With the user.id, we can access, for instance, all of the contacts that the user has (or other user-specific data).
    const payload = {
      user: {
        id: user.id
      }
    }

    // Sign the JWT. Use the payload and the jwtSecret from default.json, and set the expiry to an hour.
    // If a JWT is created,
    jwt.sign(payload, config.get('jwtSecret'), { 
      expiresIn: 36000
    }, (err, token) => {
      if (err) throw err;
      res.json({token});
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }

});




module.exports = router;