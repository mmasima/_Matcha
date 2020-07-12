var express = require("express");
var router = express.Router();
var con = require('../model/connection');
var bcrypt = require('bcrypt');

router.post('/',function(req, res){
  if (req.method == "POST")
  {
    var username = req.body.username;
    var password = req.body.password;
    if(!username || !password){
      res.status("400");
      res.end();
    }else{
      usernameExists = false;
      var check = `SELECT * FROM users WHERE username='${username}'`
        con.query(check, function (err, results, fields) 
        {
          bcrypt.compare(password, results[0].password, function(err, result){
            if (result ==  true)
            {
              results.forEach(element =>{
                 if (username == element.username){
                  usernameExists = true;
                 }
                });
                if (usernameExists == true)
                {
                  req.session.login = true
                  res.redirect('homepage')
                }
            }
            if (result == false){
              console.log('incorrect password')
              res.redirect('index')
            }
           })
        })
      }
  }else{
      console.log('not post');
  }
});


module.exports = router;