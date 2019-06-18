const express = require('express'); //"CommonJS" used in Node vs "ES6 modules" used in React
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({msg: "Welcome to the contactkeeper API!"}))

// Define Routes
app.use('/api/users', require('./routes/users')); // Anything that hits this route will be forwarded to the users.js file...
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))



app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`)
});