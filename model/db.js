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

matcha.getUsers = function (gender, preference, city, commontag, famerating) {

	return new Promise((resolve, reject) => {
		var tagetgender
		if (gender == 'Female' && preference == 'Male') {
			tagetgender = preference;
		} else if (gender == 'Male' && preference == 'Female') {
			tagetgender = preference;
		} else {
			tagetgender = preference;
		}

		con.query('SELECT username,gender, biography, city, profileimage FROM users AS u \
			INNER JOIN profile AS p ON u.id = p.profile_id INNER JOIN image AS i ON p.profile_id = i.img_id \
			INNER JOIN interests AS n ON i.img_id = n.uid\
			WHERE gender=? AND preference=? AND city=? AND interests=? AND famerating=?',
			[tagetgender, gender, city, commontag, famerating],
			(error, result) => {
				if (error) {
					return reject(error);


				}
				console.log(result)
				return resolve(result);

			})
	})

}
module.exports = matcha;