var express = require("express");
var router = express.Router();
var con = require('../model/connection');
var bcrypt = require('bcrypt');
const e = require("express");


router.get('/', function (req, res, next) {
  res.render('login', { message: req.flash('message') })
});

router.post('/', function (req, res) {
  if (req.method == "POST") {
    var username = req.body.username;
    var password = req.body.password;
    var profile_complete = 'no';

    if (!username || !password) {
      res.status("400");
      req.flash('message', 'an error occured');
      res.redirect('login');
      res.end();
    } else {
      usernameExists = false;
      var check = `SELECT * FROM users WHERE username='${username}'`
      con.query(check, function (err, results, fields) {
        if (err) throw err;
        console.log(results);
        if(results == '') {
          req.flash('message', 'username does not exist');
          res.redirect('login');
        }
        else{
          bcrypt.compare(password, results[0].password, function (err, result) {
            if (result == true) {
              var verify;
              results.forEach(element => {

                if (username == element.username) {
                  req.session.GetId = results[0].id;
                  usernameExists = true;
                  profile_complete = results[0].profile_complete;
                  verify = results[0].verify;
                }
              });
              if (usernameExists == true && verify == 'yes') {
                req.session.username = username;
                req.session.login = true;
                if (profile_complete == 'yes')
                  res.redirect('homepage');
                else
                  res.redirect('profile')
             
              } else {
                console.log('activate your account');
                req.flash('message', 'activate your account');
                res.redirect('/login');
                res.end();
              }
            }
            if (result == false) {
              console.log('incorrect password')
              req.flash('message', 'incorrect password');
              res.redirect('login');
            };
          });
        }
      });
    }
  } else {
    console.log('not post');
    res.end();
  }
});


module.exports = router;