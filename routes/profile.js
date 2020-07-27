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
        var interests = req.body.interests;
        var bio = req.body.bio;
        var image = req.body.image;
        var complete = 'yes';

        if (!age && !gender && !bio) {
            if (!art || !goingOut || !sports || !geek) {
                console.log("hello world");
                console.log(id);
                res.status("400");
                console.log("oops! something went wrong");
            }
        }
        else {
            var sql = "INSERT INTO profile \ (profile_id, age, gender, preference, biography) \
            VALUES ('"+ id + "','" + age + "','" + gender + "','" + preference + "', '" + bio + "')";
            con.query(sql, (err, result) => {
                console.log("profile query");
                if (err) throw err;
                console.log("inserted profile details");
                res.end();
            });
            var sql = "INSERT INTO interests \ (uid, interests) \
            VALUES( '"+ id + "', '" + interests + "')";
            con.query(sql, (err, result) => {
                console.log("interests query submitted");
                if (err) throw err;
                console.log("inserted interests details");
            })
            var sql = `UPDATE users SET profile_complete ='${complete}' where id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
                console.log('set profile_complete to yes');
            })
            res.redirect('homepage')
        }
    }
});

module.exports = router;