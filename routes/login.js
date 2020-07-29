var express = require("express");
var router = express.Router();
var con = require('../model/connection');
var bcrypt = require('bcrypt');

  
router.get('/', function(req, res, next) {
  res.render('login')
});

router.post('/', function (req, res) {
  if (req.method == "POST") {
    var username = req.body.username;
    var password = req.body.password;
    var profile_complete = 'no';

    if (!username || !password) {
      res.status("400");
      res.end();
    } else {
      usernameExists = false;
      var check = `SELECT * FROM users WHERE username='${username}'`
      con.query(check, function (err, results, fields) {
        if (err) throw err;
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
              res.end();
            } else {
              console.log('activate your account');
              res.render('index');

            }
          }
          if (result == false) {
            console.log('incorrect password')

          }
        })
      })
    }
  } else {
    console.log('not post');
  }
});


module.exports = router;