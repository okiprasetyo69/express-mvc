// server.js
const path = require('path');
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/userRoutes');
const transactionRoutes = require('./app/routes/transactionRoutes')
const app = express();
const PORT = 3000;

// Mengatur view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'app', 'views'));

// Middleware untuk parsing body request
app.use(bodyParser.json()); // for rest api
app.use(bodyParser.urlencoded({ extended: true }));

// Mengatur routes
app.use('/users', userRoutes);
app.use('/transaction', transactionRoutes);

// Route default
app.get('/', (req, res) => {
  // redirecr to View HTML
  // res.redirect('/users');
  res.send('Welcome to the RESTful API with Express and MySQL!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});