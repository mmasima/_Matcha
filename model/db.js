var con = require('./connection');

let matcha = {};


matcha.findUserByTokenAndEmail= function(token,email){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM users WHERE token=? AND email=?',
			[token,email],
			(error, result) => {
				if (error) {
					return reject(error);
                }
                console.log(result[0])
                return resolve(result);
                
			})
	})

}

matcha.updateUserPassword = function(password,username){
    return new Promise((resolve, reject) => {
		con.query(`UPDATE users SET password=?,token='' WHERE username =?`,
			[password,username],
			(error, result) => {
				if (error) {
					return reject(error);
                }
                console.log(result);
				return resolve(result);
			})
	})

}

module.exports = matcha;