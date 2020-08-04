var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var frgotpsswrdRouter = require('./routes/frgotpsswrd');
var passwordRouter = require('./routes/pssword');
var homeRouter = require('./routes/homepage');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
var activateAcc = require('./routes/activateAccount');
var updateProfile = require('./routes/updateProfile');
var getuserRouter = require('./API/getuser')
var viewRouter = require('./routes/viewhistory');

var logoutRouter = require('./routes/logout');

let port = 3000;
var app = express();


const sessionFunction = function(req, res, next){
    if (req.session.login){
      console.log('Welcome back,' + req.session.username+ '!');
      next()
    }else{
      console.log('please login to view this page');
      req.flash('message', 'please login to view this page');
      res.redirect('login');
    }
  }

  const sessionFunctionFgot = function(req,res, next){
    if (req.session.frgotpsswrd){
      console.log('Welcome back,' + req.session.email+ '!');
      next()
    }else{
      console.log('please login to view this ');
      req.flash('message', 'please login to view this page');
      res.redirect('login');
    }
  }

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/'));
app.use('/', indexRouter);
app.use('/frgotpsswrd',frgotpsswrdRouter);
app.use('/pssword', passwordRouter);
app.use('/homepage', sessionFunction, homeRouter);
app.use('/profile', sessionFunction, profileRouter)
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);
app.use('/updateProfile',sessionFunction, updateProfile);
app.use('/logout', logoutRouter);
app.use('/API/getuser',sessionFunction, getuserRouter);
app.use('/viewhistory', sessionFunction,viewRouter);
//app.post('/frgotpsswrd', frgotpsswrdRouter.frgotpsswrd)


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

app.listen(port, () => {
  console.log("Listern port" +port)
});
module.exports = app;
