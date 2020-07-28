var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var con = require('../model/connection');
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frgotpsswrd');
});

router.post('/', function(req,res){
  var email = req.body.userEmail;
  if (!email)
  {
    res.status("400");
    res.end();
  }
  else{
    emailExist = false;
    var check = `SELECT * FROM users where email ='${email}'`;
     con.query(check, function(err, results)
     {
       var verify
       results.forEach(element =>{
         if (email == element.email){
           emailExist = true;
           verify = results[0].verify
          
         }
       });
       if (emailExist == true && verify == 'yes'){

        var token = crypto.randomBytes(64).toString('base64');
        var sql = `UPDATE users SET token ='${token}' where email = '${email}'`;
         con.query(sql, (err, result) => {
           if (err) throw err;
           console.log(result)
           	var transporter = nodemailer.createTransport({
									 host: 'smtp.gmail.com',
                   port: 465,
									auth: {
										user: 'phyliciadancer@gmail.com',
										pass: 'Abcd@1234'
                  },
                  tls: {
          									 rejectUnauthorized: false
       									 }
                  
                });
                token = encodeURIComponent(token)
			
								var mailOptions = {
									from: 'phyliciadancer@gmail.com',
									to: email,
									subject: 'forgot Password',
                  text:`To reset your password, please click the link below.`,
                  html:`<p>change your password</p>
									<a href = 'http://localhost:3000/pssword?token=${token}&email=${email}'>here</a>`
								};
			
								transporter.sendMail(mailOptions, function (error, info) {
									if (error) {
										console.log("email doesn't exists");
										console.log(error);
									} else {
                    console.log('Email sent: ' + info.response);
      
									}
                })
              })
       }else{
         console.log("Email doesn't exist")
        }
         res.redirect('frgotpsswrd');
         res.end();
     })
  }
})

module.exports = router;