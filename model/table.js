var  mysql = require('mysql')

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database:"Matcha",
	multipleStatements:true
})

con.connect(function(err){
	if (err) throw err;
	const usersql = 'CREATE TABLE users(\
		id INT AUTO_INCREMENT PRIMARY KEY, \
		username VARCHAR(255),\
		name VARCHAR(255),\
		lastname VARCHAR(255),\
		email VARCHAR(255),\
		password VARCHAR(255))';
	const profilesql =`CREATE TABLE IF NOT EXISTS profile(
					profile_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
					username varchar(255),
					age varchar(255),
					gender varchar(255),
					preference varchar(255),
					biography varchar(255),
					city varchar(255),
					province varchar(255),
					zip varchar(255))`;
					
	const interestsSql = `CREATE TABLE IF NOT EXISTS interests(
  							interest_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  							username varchar(50) NOT NULL,
							 interestName varchar(50))`;
	
	const ImgSql = `CREATE TABLE IF NOT EXISTS image(
  						img_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  						username int(11) NOT NULL,
						  imagename varchar(255))`;
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
	