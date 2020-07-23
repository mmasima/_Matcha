var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var frgotpsswrdRouter = require('./routes/frgotpsswrd');
var passwordRouter = require('./routes/pssword');
var homeRouter = require('./routes/homepage');
var profileRouter = require('./routes/profile');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var activateAcc = require('./routes/activateAccount');
var updateProfile = require('./routes/updateProfile');

let port = 3000;
var app = express();


const sessionFunction = function(req, res, next){
    if (req.session.login){
      console.log('Welcome back,' + req.session.username+ '!');
      next()
    }else{
      console.log('please login to view this page');
      res.redirect('/');
    }
  }

  const sessionFunctionFgot = function(req,res, next){
    if (req.session.frgotpsswrd){
      console.log('Welcome back,' + req.session.email+ '!');
      next()
    }else{
      console.log('please login to view this ');
      res.redirect('/');
    }
  }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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
})) 

app.use('/', indexRouter);
app.use('/frgotpsswrd',frgotpsswrdRouter);
app.use('/pssword', passwordRouter);
app.use('/homepage', sessionFunction, homeRouter);
app.use('/profile', sessionFunction, profileRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/activateAccount', activateAcc);
app.use('/updateProfile', updateProfile);
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
