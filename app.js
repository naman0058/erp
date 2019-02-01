var createError = require('http-errors');
var cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Nexmo = require('nexmo');


var indexRouter = require('./routes/index');
var student = require('./routes/student');
var department = require('./routes/department');
var faculity = require('./routes/faculity');
var demo = require('./routes/demo');
var library = require('./routes/library');
var admin = require('./routes/admin');
var adminhome=require('./routes/adminhome');
var event = require('./routes/event');
var tpo = require('./routes/tpo');
var assignment = require('./routes/assignment');
var year = require('./routes/year');
var batch = require('./routes/batch');
var subject = require('./routes/subject');
var result = require('./routes/result');
var teacher = require('./routes/teacher'); 
var teacherhome = require('./routes/teacherhome');
const nexmo = new Nexmo({
  apiKey: 'e14f55a0',
  apiSecret: 'qtHyZuDn1VieWvB6'
},{debug:true})


//var facebooklogin = require('./routes/facebooklogin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
  name: 'session',
  keys: ['naman'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use('/', indexRouter);
app.use('/student',student);
app.use('/department',department);
app.use('/faculity',faculity);
app.use('/demo',demo);
app.use('/library',library);
app.use('/admin',admin);
app.use('/adminhome',adminhome);
app.use('/event',event);
app.use('/tpo',tpo);
app.use('/assignment',assignment);
app.use('/year',year);
app.use('/batch',batch);
app.use('/subject',subject);
app.use('/result',result);
app.use('/teacher',teacher);
app.use('/teacherhome',teacherhome);
//app.use('/facebooklogin',facebooklogin);
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

module.exports = app;
