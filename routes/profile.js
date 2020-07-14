var express = require('express');
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');

router.get('/', function(req, res, next){
    res.render('profile');
    var username = req.session.username;
    var id = req.session.GetId;
    console("here is the id !!  " + id);
});

router.post('/routes/profile.js', function (req, res){
    if (req.method == "POST"){
        var age = req.body.age;
        var gender = req.body.SelectPreference;
        var art = req.body.art;
        var goingOut = req.body.goingOut;
        var sports = req.body.sports;
        var geek = req.body.geek;
        var bio = req.body.bio;
        var image =  req.body.image;
        var City = req.body.City;
        var Province = req.body.Province;
        var Zip = req.body.Zip;
        
        console.log(id);
        if(!age || !gender || !bio || !City || !Province || !Zip){
                res.status("400");
                console.log("oops! something went wrong");
        }
        else{
            var sql = "INSERT INTO profile\ (profile_id, age, gender, preference, biography, city, province, zip) \
            VALUES ('"+id+"','"+age+"','"+gender+"','"+preference+"', '"+City+"', '"+Province+"', '"+Zip+"',)";
            con.query(sql, (err, reult) => {
                console.log("profile query");
                if(err) throw err;
                console.log("inserted profile details");
                res.end();
            })
        }
    }
 });

module.exports = router;