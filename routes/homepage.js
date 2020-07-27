var express = require('express');
var router = express.Router();
var uploadImage = require('../logic/uploadImage');
var con = require('../model/connection');
var db = require('../model/db');

/*Get*/
router.get('/', function (req, res, next) {
    con.query('SELECT * FROM image', function (err, data) {
        if (err) throw err;
        
        res.render('homepage', {userdata: data})
    })
});

module.exports = router;