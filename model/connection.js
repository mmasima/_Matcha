var mysql = require('mysql');

//connect to the database
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
    password: "000000",
    database: "matcha"
});

module.exports = con;