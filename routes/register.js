var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcrypt");
const saltRound = 10;

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "matcha"
});

router.post('/', function (req, res) 
{
    if (req.method == "POST") 
    {
		var name = req.body.userName;
		var lastname = req.body.lastName;
		var email = req.body.userEmail;
		var password = req.body.userPassword;
		var confirm = req.body.confirmPassword;
		var gender = req.body.Gender;
		if (!name || !lastname || !email || !password || !confirm || !gender) 
		{
			res.status("400");
			// res.send("Invalid details!");
		}else 
		{
			emailExists = false;
			nameExists = false;
			var check = "SELECT * FROM users where name ='" + name + "' or email ='" + email + "'";
			con.query(check, function (err, results) {
				results.forEach(element => {
					if (email == element.email) {
						emailExists = true;
					}
					if (name == element.name) {
						nameExists = true;

					}
				});
				if (nameExists == false && emailExists == false)
				{ 
					if (password == confirm)
					{	
						bcrypt.hash(password, saltRound, function (err, hash) 
						{
    	 		           var sql = "INSERT INTO users\
    	 		           (name, lastname, email, password, gender) \
    	 		           VALUES ('" + name + "', '" + lastname + "', '" + email + "',\
							 '" +hash+ "', '" + gender + "')";
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
				if (nameExists == true) {
					console.log("name already exists");
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