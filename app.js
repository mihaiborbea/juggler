const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const config = require('./config/database');
const dotenv = require('dotenv');

const index = require('./routes/index.route');
const users = require('./routes/users.route');
const api = require('./routes/api.route');

const app = express();
dotenv.config();

// DB connection
mongoose.Promise = bluebird;
mongoose
  .connect(config.database)
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database at ${config.database}`);
  })
  .catch(err => {
    console.log(`Error Connecting to the Mongodb.\nERROR: ${err}`);
  });

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, UserId'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// Logger (morgan)
app.use(logger('dev'));

// Body parsers
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
