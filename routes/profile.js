var express = require('express');
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');

router.get('/', function (req, res, next) {
    res.render('profile');
    var username = req.session.username;
});

router.post('/', function (req, res) {
    var id = req.session.GetId;
    if (req.method == "POST") {

        var gender = req.body.gender;
        var age = req.body.age;
        var preference = req.body.SelectPreference;
        var art = req.body.art;
        var goingOut = req.body.goingOut;
        var sports = req.body.sports;
        var geek = req.body.geek;
        var bio = req.body.bio;
        var image = req.body.image;

        if (!age && !gender && !bio) {
            if (!art || !goingOut || !sports || !geek) {
                console.log("hello world");
                console.log(id);
                res.status("400");
                console.log("oops! something went wrong");
            }
        }
        else {
            var sql = "INSERT INTO profile\ (profile_id, age, gender, preference, biography) \
            VALUES ('"+ id + "','" + age + "','" + gender + "','" + preference + "', '" + bio + "')";
            con.query(sql, (err, result) => {
                console.log("profile query");
                if (err) throw err;
                console.log("inserted profile details");
                res.end();
            });
            var sql = "INSERT INTO interests \ (img_id, Art, goingOut, sports, geek) \
            VALUES( '"+ id + "', '"+ art + "', '" + goingOut + "', '" + sports + "', '" + geek + "')";
            con.query(sql, (err, result) => {
                console.log("interests query submitted");
                if (err) throw err;
                console.log("inserted interests details");
            })
            res.redirect('homepage')
        }
    }
});

module.exports = router;