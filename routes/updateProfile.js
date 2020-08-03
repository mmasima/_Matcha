var express = require("express");
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');

router.get('/', function (req, res, next) {
    res.render('updateProfile', {
        message: req.flash('message'),
        success: req.flash('success'),
     });
});

router.post('/',  function(req, res){
        var id = req.session.GetId;
        var age = req.body.age;
        var preference = req.body.SelectPreference;
        var interests = req.body.interests;
        var bio = req.body.bio;
        var image = req.body.image;
        var minAge = 18;
        
        if( minAge > parseInt(age) ){
            req.flash('message', 'You have to be over 18');
            res.redirect('updateProfile');
        }
        else if (age == '' && preference == 'Choose...' && interests == '' && bio == '' ) {
                res.status("400");
                req.flash('message', 'you havent changed anything!');
                res.redirect('updateProfile');
                console.log("oops! something went wrong");
        }
        else{
            if (age != '') {
                var sql = `UPDATE profile SET age ='${age}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('age');
                })
            };
            if (preference != 'Choose...') {
                console.log(id);
                var sql = `UPDATE profile SET preference ='${preference}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('preference');
                })
            };
            if (interests != '') {
                console.log(id);
                var sql = `UPDATE interests SET interests ='${interests}' where uid = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('interests updated');
                })
            };
           
           
            if (bio != '') {
                console.log(id);
                var sql = `UPDATE profile SET biography ='${bio}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('bio');
                })
            };
            req.flash('success', 'Profile changed!');
            res.redirect('updateProfile');
        }
        res.redirect('updateProfile');
        

})
module.exports = router;