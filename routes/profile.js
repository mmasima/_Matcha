var express = require('express');
var router = express.Router();
var con = require('../model/connection');

router.get('/', function(req, res, next){
    res.render('profile');
});
// router.post('/routes/profile.js', function (req, res){
//     // if (req.method == "POST"){

//     //     var age = req.body.age;
//     //     var gender = req.body.SelectPreference;
//     //     var art = req.body.art;
//     //     var goingOut = req.body.goingOut;
//     //     var sports = req.body.sports;
//     //     var geek = req.body.geek;
//     //     var bio = req.body.bio;
//     //     var image =  req.body.image;
//     //     var City = req.body.City;
//     //     var Province = req.body.Province;
//     //     var Zip =req.body.Zip;

//     //     if(!age || !gender || art || goingOut || sports || geek ||bio
//     //         || !image || !City || !Province || !Zip){
//     //             res.status("400");
//     //     }
//     //     else{
//     //         var sql = "INSERT INTO profile\ (age, gender, preference, biography, city, province, zip) \
//     //         VALUES ('"+age+"','"+gender+"', '"+art+"', '"+goingOut+"', '"+City+"', '"+Province+"', '"+Zip+"',)";
//     //         con.query(sql, (err, reult) => {
//     //             console.log("profile query");
//     //             if(err) throw err;
//     //             console.log("inserted profile details");
//     //             res.end();

//     //         var sql =  "INSERT INTO interests\ (interestName) \ 
//     //         VALUES ('""'
//     //         })
//     //     }
//     // }
// })
module.exports = router;