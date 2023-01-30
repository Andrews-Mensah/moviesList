var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
// const connect = require('./utils/connect')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies.router')
const castsRouter = require('./routes/casts.router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const config = require ("./config/config")



async function connect (){
  const dbURI = config.dbUri;

  try{
    await mongoose.connect(dbURI)
    console.log("DB is fully connected")
  }

  catch (error){
    console.log("Error", error)
    console.log("Can't connect to db")
  }
}

connect();




app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/casts', castsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cors());
app.use(function (_req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

module.exports = app;
