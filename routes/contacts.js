const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts (associated w specific user)
// @access  Private
// NOTE: '/' corresponds to api/contacts in this file
router.get('/', (req,res) => {
  res.send("Get all contacts!");
});

// @route   POST api/contacts
// @desc    Add new contact (associated w specific user)
// @access  Private
// NOTE: '/' corresponds to api/contacts in this file
router.post('/', (req,res) => {
  res.send("Add contact!");
});

// @route   PUT api/contacts/:id
// @desc    Update users contact (associated w specific user)
// @access  Private
// NOTE: '/' corresponds to api/contacts in this file, so we still need a /:id
router.put('/:id', (req,res) => {
  res.send("Updated Contact!");
});

// @route   DELETE api/contacts/:id
// @desc    Delete user contact  (associated w specific user)
// @access  Private
// NOTE: '/' corresponds to api/contacts in this file, so we still need to specify id with /:id
router.delete('/:id', (req,res) => {
  res.send("Deleted contact!");
});



module.exports = router;