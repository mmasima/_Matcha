var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var crypto = require('crypto');
const saltRound = 10;
var con = require('../model/connection');

router.post('/', function (req, res) 
{
    if (req.method == "POST") 
    {
		var username = req.body.userName
		var name = req.body.Name;
		var lastname = req.body.lastName;
		var email = req.body.userEmail;
		var password = req.body.userPassword;
		var confirm = req.body.confirmPassword;
		if (!username || !name || !lastname || !email || !password || !confirm) 
		{
			res.status("400");
			// res.send("Invalid details!");
		}else 
		{
			emailExists = false;
			usernameExists = false;
			var check = "SELECT * FROM users where username ='" + username + "' or email ='" + email + "'";
			con.query(check, function (err, results) {
				results.forEach(element => {
					if (email == element.email) {
						emailExists = true;
					}
					if (username == element.username) {
						usernameExists = true;
					}
				});
				if (usernameExists == false && emailExists == false)
				{ 
					if (password == confirm)
					{	
						bcrypt.hash(password, saltRound, function (err, hash) 
						{
							var token = crypto.randomBytes(64).toString('base64');
							var sql = `INSERT INTO users (username, name,lastname,email,password,token,verify) 
							VALUES( '${username}', '${name}','${lastname}' ,'${email}', '${hash}', '${token}','no')`
							con.query(sql, (err, result) => {
								if (err) throw err;
								var transporter = nodemailer.createTransport({
									service: 'gmail',
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
									subject: 'ActivateAccount',
									text: 'That was not that easy!',
									html:`<p>activate your account</p>
									<a href = 'http://localhost:3000/activateAccount/?token=${token}'>here</a>`

								};
			
								transporter.sendMail(mailOptions, function (error, info) {
									if (error) {
										console.log("email doesn't exists");
										console.log(error);
									} else {
										console.log('Email sent: ' + info.response);
									}
								})
								});
						});
					}else{
						console.log("password not match confirm");
					}
				}
				if (usernameExists == true) {
					console.log("username already exists");
				}
				if (emailExists == true) {
					console.log("email exists");
				}
				res.render('index');
				res.end();
		    });
		}
    } else 
    {
		console.log("not post");
    }
});

module.exports = router;
