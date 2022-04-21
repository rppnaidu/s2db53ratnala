var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true });

var Queen = require("./models/queen");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var queensRouter = require('./routes/queens');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/queens', queensRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter)
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// We can seed the collection if needed on server start
async function recreateDB() {

// Delete everything in Queen
  await Queen.deleteMany();

  let instance5 = new Queen({ queen_name: "Jansi Rani", queen_country: 'India', networth: 1620500 });
  instance5.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved in Queen")
  });

  let instance6 = new Queen({ queen_name: "Victoria", queen_country: 'England', networth: 1520700 });
  instance6.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved in Queen")
  });

  let instance7 = new Queen({ queen_name: "Elizbeth", queen_country: 'Britain', networth: 2143400 });
  instance7.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved in Queen")
  });

}
let reseed = true;
if (reseed) { recreateDB(); }

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () { console.log("Connection to DB succeeded") });