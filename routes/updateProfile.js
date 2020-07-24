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

        // if (age || gender || preference || art || goingOut || geek || sports || bio ) {
        //         res.status("400");
        //         console.log("oops! something went wrong");
        // }
        // else{
            if (age != '') {
                var sql = `UPDATE profile SET age ='${age}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('age');
                })
            };
            if (gender != '') {
                console.log(id);
                var sql = `UPDATE profile SET gender ='${gender}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('gender');
                })
            };
            if (preference != '') {
                console.log(id);
                var sql = `UPDATE profile SET preference ='${preference}' where profile_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('preference');
                })
            };
            if (art != '') {
                console.log(id);
                var sql = `UPDATE interests SET art ='${art}' where img_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('art');
                })
            };
            if (goingOut != '') {
                console.log(id);
                var sql = `UPDATE interests SET goingOut ='${goingOut}' where img_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('goingOut');
                })
            };
            if (geek != '') {
                console.log(id);
                var sql = `UPDATE interests SET geek ='${geek}' where img_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('geek');
                })
            };
            if (sports != '') {
                console.log(id);
                var sql = `UPDATE interests SET sports ='${sports}' where img_id = '${id}'`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log('sports');
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
        

})
module.exports = router;