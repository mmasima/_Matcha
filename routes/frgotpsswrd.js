var express = require('express');
var router = express.Router();
var con = require('../model/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frgotpsswrd');
});

router.post('/', function(req,res){
  var email = req.body.userEmail;
  if (!email){
    res.status("400");
    res.end();
  }else{
    emailExist = false;
    var check = `SELECT * FROM users where email =\
     '${email}'`;
     con.query(check, function(err, results){
       results.forEach(element =>{
         if (email == element.email){
           emailExist = true;
         }
       });
       if (emailExist == true){
         res.redirect('pssword');
       }else{
         console.log("Email doesn't exist")
         res.redirect('frgotpsswrd');
         res.end();
       }
     })
  }
})

module.exports = router;