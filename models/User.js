// This file is for a mongoose model. It's convention that it's uppercased.
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
})

/**
 * To create a Mongoose model, pass a string that you want to be the name of the collection (+s) as well as the mongoose schema to mongoose.model.
 */
module.exports = mongoose.model('user', UserSchema);