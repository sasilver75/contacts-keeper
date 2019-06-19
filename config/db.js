const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
/**
 * Notes on config npm package: https://www.npmjs.com/package/config
 * It just helps us draw information from our default.json file, which is in the same directory that we're in right now.
 */

const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log("Error connecting to DB: ", err.message)
    process.exit(1); // Will exit with failure
  })
}

module.exports = connectDB;