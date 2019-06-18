const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
// NOTE: '/' corresponds to api/auth in this file
router.get('/', (req,res) => {
  res.send("Get logged in user!");
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
// NOTE: '/' corresponds to api/auth in this file
router.post('/', (req,res) => {
  res.send("Log in user");
});


module.exports = router;