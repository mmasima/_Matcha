var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require('bcrypt');

/* */
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "matcha"
});

router.post('/',function(req, res){
  if (req.method == "POST")
  {
    var email = req.body.userEmail;
    var password = req.body.password;
    if(!email || !password){
      res.status("400");
      res.end();
    }else{
      emailExists = false;
      var check = `SELECT * FROM users WHERE email='${email}'`
        con.query(check, function (err, results, fields) 
        {
          bcrypt.compare(password, results[0].password, function(err, result){
            if (result ==  true)
            {
              results.forEach(element =>{
                 if (email == element.email){
                  emailExists = true;
                 }
                });
                if (emailExists == true)
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