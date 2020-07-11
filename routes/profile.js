var express = require('express');
var router = express.Router();
var con = require('../model/connection');


/*get*/
router.get('/', function(req, res, next){
    res.render('profile');
});

module.exports = router;