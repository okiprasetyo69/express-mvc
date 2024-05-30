// server.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/userRoutes');

const app = express();
const PORT = 3000;

// Mengatur view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Middleware untuk parsing body request
app.use(bodyParser.urlencoded({ extended: true }));

// Mengatur routes
app.use('/users', userRoutes);

// Route default
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});