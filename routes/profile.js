var express = require('express');
var router = express.Router();
var con = require('../model/connection');
const session = require('express-session');
var upload = require('../logic/uploadImage')
var multer = require("multer");
var db = require('../model/db')
var fetch = require('node-fetch')

router.get('/', function (req, res, next) {
    res.render('profile', { message: req.flash('message') });
    var username = req.session.username;
});


router.post('/', async function (req, res) {

    // var id = req.session.GetId;

    // var gender = req.body.gender;
    // var age = req.body.age;
    // var preference = req.body.SelectPreference;
    // var interests = req.body.interests;
    // var bio = req.body.bio;
    // var image = req.body.image;
    // var complete = 'yes';

    // // if (!age || !gender || !bio || !interests) {

    //     res.status("400");
    //     res.redirect('/')
    //     console.log("oops! something went wrong");
    //     console.log("some fields may be missing");
    // }
    //  else {

    try {
        upload(req, res, async (err) => {
            var id = req.session.GetId;

            var gender = req.body.gender;
            var age = req.body.age;
            var preference = req.body.SelectPreference;
            var interests = req.body.interests;
            var bio = req.body.bio;
            var city = req.body.city;
            //var profileimage = req.body.image;
            var complete = 'yes';

            if (err instanceof multer.MulterError) {
                res.render('/profile', {
                    error: {
                        message: "An error occured uploading your images`",
                    }
                })
            }
            else if (err) {
                res.send(err);
            } else {
                var profileimage = req.file;
                console.log(profileimage);
                var sql = await db.insertProfile(id, age, gender, preference, bio, city);
                var insertInterests = await db.insertInterests(id, interests)
                var profilecomplete = await db.updateProfileComplete(complete, id);
                await db.insertPicture(id, profileimage.filename);
                res.redirect('homepage')
            }
        })
    } catch (error) {
        console.log("error profile ", error.message);
        req.flash("message", "error profile");
        res.redirect('profile');

    }
    
});

router.post('/location', async (req, res) => {
    if (req.session.username) {
      try {

        let loc = {};
        const location = await fetch(`https://ipinfo.io/?token=9df2c749be0a36`);
        const location_data = await location.json();

        loc.latitude = location_data.loc.split(',')[0];
        loc.longitude = location_data.loc.split(',')[1];
        loc.country = location_data.country;
        loc.postal_code = location_data.postal;
        loc.city = location_data.city;
        loc.region = location_data.region;
        console.log(loc);
        await db.updateUserLocation(loc, req.session.GetId);
        res.status(200).json({ status: true, message: "successful..." });
      } catch (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "an error occured..." });
      }
    } else {
      res.status(401).json({ status: false, message: "You are not logged in..." });
    }
  });

module.exports = router;
