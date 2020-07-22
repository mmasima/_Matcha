var con = require('./connection');

let matcha = {};


matcha.findUserByToken= function(token){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM users WHERE token=?',
			[token],
			(error, result) => {
				if (error) {
					return reject(error);
                }
                console.log(result)
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


matcha.activateAccount = function(token){
    return new Promise((resolve, reject) => {
		con.query(`UPDATE users SET verify=?,token='' WHERE token =?`,
			['yes',token],
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