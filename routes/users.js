const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
// NOTE: '/' corresponds to api/users in this file
router.post('/', (req,res) => {
  res.send("Register a User");
});

module.exports = router;