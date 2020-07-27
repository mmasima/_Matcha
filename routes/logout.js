 var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
		if (req.session.login) {
			const username = req.session.username;
			req.session.destroy(async (err) => {
				if (err) console.log(err);
				res.status(200).render('index');
				res.end();
			});
		} else {
			res.status(200).render('index');
			res.end();
		}
	});

module.exports = router;