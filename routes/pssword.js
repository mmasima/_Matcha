var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var con = require('../model/connection');
var db = require('../model/db');
const saltRound = 10
var email;
var token;

/*get*/
router.get('/', function (req, res, next) {
    email = req.query.email;
    token = decodeURIComponent(req.query.token);
    if (email && token) {

        res.render('pssword');
    } else {
        res.render('frgotpsswrd');
    }
    res.end();
});

//console.log('token'+token);

router.post('/', async function (req, res) {

    var password = req.body.newPassword;
    var confirm = req.body.confirmPassword;

    if (!password || !confirm) {
        res.status("400");
        res.end();
    } else {
        if (password === confirm) {
            try {


                let newPassword = await bcrypt.hash(password, saltRound);
                let user = await db.findUserByTokenAndEmail(token, email);
                user = user[0]
                await db.updateUserPassword(newPassword, user.username);
                res.send('success')


            } catch (error) {
                console.log('error updating password ', error.message)

            }


        }

    }
})


module.exports = router;