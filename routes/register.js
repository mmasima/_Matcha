var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcrypt");
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
    	 		           var sql = "INSERT INTO users\
    	 		           (username,name, lastname, email, password) \
    	 		           VALUES ('"+username+"','" + name + "', '" + lastname + "', '" + email + "',\
							 '" +hash+ "')";
							con.query(sql, (err, result) => {
									console.log("query");
									if (err) throw err;
									console.log("Inserted")
									res.end();
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
		    });
		}
    } else 
    {
		console.log("not post");
    }
});

module.exports = router;
