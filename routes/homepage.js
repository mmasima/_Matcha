var express = require('express');
var router = express.Router();
var uploadImage = require('../logic/uploadImage');
var con = require('../model/connection');
var db = require('../model/db');

/*Get*/
router.get('/', function (req, res, next) {
    con.query('SELECT username,gender, biography, city, profileimage FROM users AS u \
    INNER JOIN profile AS p ON u.id = p.profile_id INNER JOIN image AS i ON p.profile_id = i.img_id', function (err, data) {
        if (err) throw err;
        
        res.render('homepage', {userdata: data})
    })
});
router.post('/', (req, res) => {
    const upload = require('../logic/uploadImage');
    var image = req.body.image;
    image = image || [];

    uploadImage.array('image', image.length)(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                req.flash('error', 'Too many files, max files allowed ' + (5 - userImages.length));
                return next();
            } else {
                console.log(err);
                return res.status(500).send('Server error');
            }
        }

        else {
            console.log(req.file);
            res.send('test');
        }
    });
});
module.exports = router;