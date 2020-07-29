var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var crypto = require('crypto');
const saltRound = 10;
var con = require('../model/connection');
var db = require('../model/db');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

router.post('/', async function (req, res) {
	console.log('hello');
	var username = req.body.userName
	var name = req.body.Name;
	var lastname = req.body.lastName;
	var email = req.body.userEmail;
	var password = req.body.userPassword;
	var confirm = req.body.confirmPassword;
	if (!username || !name || !lastname || !email || !password || !confirm) {
		console.log('empty')
		res.end();
	} else {
		if (db.usernameV(username) && db.passwordV(password) && db.emailV(email) && db.firstNameV(name) && db.lastNameV(lastname)) {
			emailExists = false;
			usernameExists = false;
			var check = await db.checkEmailAndUserNameExist(username, email);
			check.forEach(element => {
				if (email == element.email) {
					emailExists = true;
				}
				if (username == element.username) {
					usernameExists = true;
				}
			});
			if (usernameExists == false && emailExists == false) {
				if (password == confirm) {
					bcrypt.hash(password, saltRound, function (err, hash) {
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
								html: `<p>activate your account</p>
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

				} else {
					console.log("password not match confirm");
					res.end()
				}
			}
			if (usernameExists == true) {
				console.log("username already exists");
				res.end()
			}
			if (emailExists == true) {
				console.log("email exists");
				res.end
			}
			res.render('index');
			res.end();
		} else {
			if (!db.usernameV(username)) {
				console.log('your username need to be 2 - 20 haracters long and contain at least one lower case alphabet')
				res.end();
			} else if (!db.emailV(email)) {
				console.log('your email needs to be in this format: user@mail.domain')
				res.end();
			} else if (!db.passwordV(password)) {
				console.log('a password must contain lower and upper case characters, digit(s), and special character(s)');
				res.end();
			} else if (!db.lastNameV(lastname)) {
				console.log('your firstname need to be 2 - 20 haracters long and contain at least one lower case alphabet')

				res.end();
			} else if (!db.firstNameV(name)) {
				console.log('your lastname need to be 2 - 20 haracters long and contain at least one lower case alphabet')
				res.end();
			}
		}
	}
});

module.exports = router;
