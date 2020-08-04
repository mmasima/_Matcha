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

matcha.getUsers = function (gender, preference, city, interests, famerating) {

	return new Promise((resolve, reject) => {
		var tagetgender
		if (gender == 'Female' && preference == 'Male') {
			tagetgender = preference;
		} else if (gender == 'Male' && preference == 'Female') {
			tagetgender = preference;
		} else {
			tagetgender = preference;
		}

		con.query('SELECT username,gender ,age, biography, city, profileimage FROM users AS u \
			INNER JOIN profile AS p ON u.id = p.profile_id INNER JOIN image AS i ON p.profile_id = i.img_id \
			INNER JOIN interests AS n ON i.img_id = n.uid\
			WHERE block=? AND fakeaccount=? AND gender=? AND preference=? AND city=? AND interests=? AND famerating=?',
			['no', 'no', tagetgender, gender, city, interests, famerating],
			(error, result) => {
				if (error) {
					return reject(error);


				}
				//console.log(result)
				return resolve(result);

			})
	})

}


matcha.search = function () {
	return new Promise((resolve, reject) => {
		con.query(`SELECT * FROM users AS u INNER JOIN profile AS p ON u.id = p.profile_id 
		INNER JOIN interests AS i ON p.profile_id = i.uid INNER JOIN image AS m ON i.uid = m.img_id
		WHERE block=? AND fakeaccount=?`,
			['no', 'no'],
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

matcha.getUserByUsername = function (username) {
	return new Promise((resolve, reject) => {
		con.query(`SELECT * FROM users AS u INNER JOIN profile AS p ON u.id = p.profile_id 
		INNER JOIN interests AS i ON p.profile_id = i.uid INNER JOIN image AS m ON i.uid = m.img_id
		WHERE username=?`,
			[username],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}

matcha.updateUserLocation = function (loc, profile_id) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE profile set latitude=?, longitude=?, city=?, country=?, postal_code=?,region=? WHERE profile_id=?`,
			[
				loc.latitude, loc.longitude, loc.country, loc.postal_code, loc.city, loc.region, profile_id
			], (err, result) => {
				if (err) return reject(err);
				return resolve(result);
			});
	});
}

matcha.updateFame = function (like, id) {
	return new Promise((resolve, reject) => {
		con.query("UPDATE profile SET famerating=? WHERE profile_id=?",
			[like, id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}


matcha.updateBlock = function (id) {
	return new Promise((resolve, reject) => {
		con.query("UPDATE users SET block=? WHERE id=?",
			['yes', id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}

matcha.updateFakeAcc = function (id) {
	return new Promise((resolve, reject) => {
		con.query("UPDATE users SET fakeaccount=? WHERE id=?",
			['yes', id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}


matcha.insertHistory = function (username, view) {
	return new Promise((resolve, reject) => {
		con.query(`INSERT INTO view (viewer,viewed, type) VALUES(?,?,?)`,
			[username, view, 'view'],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			})
	})
}

matcha.getHistory = function (username) {
	return new Promise((resolve, reject) => {
		con.query("select * from view where viewed=?",
			[username],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result);
			})
	})
}

matcha.checkLikes = function (myId, liked_id) {
	return new Promise((resolve, reject) => {
		con.query('select * from likes where like_user_id=? and liked_user_id=?',
			[myId, liked_id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			});
	})
}

matcha.insertLikes = function (I_liked, Person_liked, type) {
	return new Promise((resolve, reject) => {
		con.query('INSERT INTO likes(like_user_id, liked_user_id, type) VALUES (?,?, ?)',
			[I_liked, Person_liked, type],
			(error, result) => {
				if (error) {
					return reject(error);
				}
			})
		console.log(result)
		return resolve(result);
	})
}

matcha.updateLikes = function (myId, liked_id, type) {
	return new Promise((resolve, reject) => {
		con.query('UPDATE likes set type=? where like_user_id=? and liked_user_id=?',
			[type, myId, liked_id],
			(error, result) => {
				if (error) return reject(error[0]);
				return resolve(result[0]);
			});
	})
}

module.exports = matcha;
