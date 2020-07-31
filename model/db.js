var con = require('./connection');

let matcha = {};

matcha.usernameV = function (username) {
	const validUserPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
	return username.match(validUserPattern);
};

matcha.emailV = (email) => {
	const validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
	return email.match(validEmailPattern);
};

matcha.passwordV = (password) => {
	const validPassPattern = /(?=^.{6,100}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
	return password.match(validPassPattern);
};

matcha.firstNameV = (name) => {
	const validNamePattern = /(?=^.{2,50}$)^[A-Za-z]+$/;
	return name.match(validNamePattern);
};

matcha.lastNameV = (name) => {
	const validNamePattern = /(?=^.{2,50}$)^[A-Za-z]+$/;
	return name.match(validNamePattern);
};

matcha.checkEmailAndUserNameExist = function (username, email) {
	return new Promise((resolve, reject) => {
		con.query('SELECT * FROM users WHERE username=? OR email=?',
			[username, email],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.insertUserInfo = function (username, name, lastname, email, hash, token) {
	return new Promise((resolve, reject) => {
		con.query('INSERT INTO users (username, name,lastname,email,password,token,verify) VALUES(?,?,?,?,?,?,?)',
			[username, name, lastname, email, hash, token, 'no'],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.findUserByToken = function (token) {
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

matcha.updateUserPassword = function (password, username) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE users SET password=?,token='' WHERE username =?`,
			[password, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}


matcha.activateAccount = function (token) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE users SET verify=?,token='' WHERE token =?`,
			['yes', token],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}


matcha.insertProfile = function (id, age, gender, preference, bio, city) {
	return new Promise((resolve, reject) => {
		con.query(`INSERT INTO profile (profile_id, age, gender, preference, biography, city)
            VALUES(?,?,?,?,?,?)`,
			[id, age, gender, preference, bio, city],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.insertInterests = function (id, interests) {
	return new Promise((resolve, reject) => {
		con.query(`INSERT INTO interests (uid, interests) VALUES(?,?)`,
			[id, interests],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.updateProfileComplete = function (complete, id) {
	return new Promise((resolve, reject) => {
		con.query('UPDATE users SET profile_complete =? WHERE id =?',
			[complete, id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.insertPicture = function (id, profileimage) {
	return new Promise((resolve, reject) => {
		con.query('INSERT INTO image (img_id,profileimage) VALUES(?,?)',
			[id, profileimage],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})

}

matcha.getProfile = (id) => {
	return new Promise((resolve, reject) => {
		con.query("select * from profile where profile_id=?",
			[id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
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


matcha.search = function () {
	return new Promise((resolve, reject) => {
		con.query(`SELECT * FROM users AS u INNER JOIN profile AS p ON u.id = p.profile_id 
		INNER JOIN interests AS i ON p.profile_id = i.uid INNER JOIN image AS m ON i.uid = m.img_id`,
			(error, result) => {
				if (error) {
					return reject(error);
				}
				//console.log(result);
				return resolve(result);
			})
	})

}

matcha.getInterest = function (id) {
	return new Promise((resolve, reject) => {
		con.query("select * from interests where uid=?",
			[id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}

module.exports = matcha;
