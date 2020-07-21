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
    token = req.query.token;
    if (email && token) {
        console.log('okay' + req.query.email);
        res.render('pssword');
    } else {
        res.render('frgotpsswrd');
    }
    res.end();
});

router.post('/', async function (req, res) {
  
        var password = req.body.newPassword;
        var confirm = req.body.confirmPassword;
        //var email = req.query.email;
        //var token  = req.query.token;

        if (!password || !confirm) {
            res.status("400");
            res.end();
        } else {
            if (password === confirm) {
                try {
                    console.log(email,token)
                    //console.log(user.username)
                    let newPassword = await bcrypt.hash(password, saltRound);
                    let user = await db.findUserByTokenAndEmail(token,email);
                    console.log(user)
                    await db.updateUserPassword(newPassword, user.username);
                    res.send('success')


                } catch (error) {
                    console.log('error updating password ',error.message)

                }

            
            }

        }
})


module.exports = router;