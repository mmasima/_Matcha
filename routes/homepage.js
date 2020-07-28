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

module.exports = router;