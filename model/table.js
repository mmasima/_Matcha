var  mysql = require('mysql');
const { verify } = require('crypto');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database:"Matcha",
	multipleStatements:true
})

con.connect(function(err){
	if (err) throw err;
	const usersql = 'CREATE TABLE IF NOT EXISTS users(\
		id INT AUTO_INCREMENT PRIMARY KEY, \
		username VARCHAR(255) ,\
		name VARCHAR(255),\
		lastname VARCHAR(255),\
		email VARCHAR(255),\
		password VARCHAR(255),\
		token VARCHAR(255),\
		verify VARCHAR(3))';
	const profilesql =`CREATE TABLE IF NOT EXISTS profile(
					profile_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
					age int(11),
					gender varchar(255),
					preference varchar(255),
					biography varchar(255),
					FOREIGN KEY (profile_id) REFERENCES users(id))`;
					
	const interestsSql = `CREATE TABLE IF NOT EXISTS interests(
  							img_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
							Art int(11),
							goingOut int(11),
							sports int(11),
							geek int(11),
							FOREIGN KEY (img_id) REFERENCES users(id))
							`;
	
	const ImgSql = `CREATE TABLE IF NOT EXISTS image(
  						img_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
						imagename varchar(255),
						FOREIGN KEY (img_id) REFERENCES users(id))`;
	con.query(
		`${usersql};
		${profilesql};
		${interestsSql};
		${ImgSql}`,
		function(error, result) {
			if (err) throw err;
			
			console.log(result);
			console.info('Tables created');
            });
});
	