var express = require("express");
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');

router.get('/', function (req, res, next) {
    res.render('updateProfile');
});

router.post('/',  function(req, res){
        var id = req.session.GetId;
        var gender = req.body.gender;
        var age = req.body.age;
        var preference = req.body.SelectPreference;
        var art = req.body.art;
        var goingOut = req.body.goingOut;
        var sports = req.body.sports;
        var geek = req.body.geek;
        var bio = req.body.bio;
        var image = req.body.image;

        if (!age) {
                console.log(age);
                res.status("400");
                console.log("oops! something went wrong");
        }
        else{
            if (age) {
                console.log(id);
                var sql = `UPDATE profile SET age ='${age}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('profileupdate');
                })
            };
        }

})
module.exports = router;