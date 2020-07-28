var express = require('express');
var router = express.Router();
var uploadImage = require('../logic/uploadImage');
var con = require('../model/connection');
var db = require('../model/db');

/*Get*/
router.get('/', async function (req, res, next) {
    try {
        let data = await db.getUsers('Male','Female', 'Randburg', '#gaming',5);
        console.log(data)
        res.render('homepage', {userdata: data})
        
    } catch (error) {
        console.log('error updating profile ',error.message)
    }
});

module.exports = router;