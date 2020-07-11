var con = require('../model/connection');


//extended users info table
con.connect(function(err){
	if (err) throw err;
	console.log("connected!");
	var sql = 'CREATE TABLE users ( \
				id INT AUTO_INCREMENT PRIMARY KEY, \
				name VARCHAR(255),\
				lastname VARCHAR(255),\
				email VARCHAR(255),\
				password VARCHAR(255))';
	con.query(sql, function(err, result){
		if (err) throw err;
		console.log("Table users created");
	});
});

//extended info table
var extended = 'CREATE TABLE extendedInfo ( \
				gender VARCHAR(255),\
				bio VARCHAR(255))';
		con.query(extended, function(err, result){
			if(err) throw err;
			console.log("Table extended info created");

		})