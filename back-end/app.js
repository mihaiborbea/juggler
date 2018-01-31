
var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index.route');
var users = require('./routes/users.route');
var api = require('./routes/api.route');

var app = express();

var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird;

// db connection
mongoose
  .connect('mongodb://127.0.0.1:27017/todoapp', {
    useMongoClient: true
  })
  .then(() => {
    console.log(
      `Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`
    );
  })
  .catch(() => {
    console.log(
      `Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp`
    );
  });

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// routes
app.use('/', index);
app.use('/users', users);
app.use('/api', api);

module.exports = app;
