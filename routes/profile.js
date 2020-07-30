var express = require('express');
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');

router.get('/', function (req, res, next) {
    res.render('profile', { message: req.flash('message') });
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
        var minAge = 18;
        
        if( minAge > parseInt(age) ){
            console.log('hello world!!');
            req.flash('message', 'sorry you have to be over 18 to continue');
            res.redirect('profile');
        }
        if (!age || !gender || !bio || !interests || !image) {
            
                req.flash('message', 'some fields may be missing');
                res.redirect('profile');
                res.status("400");
                console.log("oops! something went wrong");
                console.log("some fields may be missing");
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
            VALUES( '"+ id + "', '"+ interests + "')";
            con.query(sql, (err, result) => {
                console.log("interests query submitted");
                if (err) throw err;
                console.log("inserted interests details");
            })
            var sql =`UPDATE users SET profile_complete ='${complete}' where id = '${id}'`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
                console.log('set profile_complete to yes');
            })
            res.redirect('homepage')
        }
        res.redirect('/')
    }
});

module.exports = router;