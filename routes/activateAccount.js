var express = require('express');
var router = express.Router();
var db = require('../model/db');
var toke


/*get*/
router.get('/', async function (req, res, next) {
     token = decodeURIComponent(req.query.token);
     if(token){
         let user = await db.findUserByToken(token);
         user = user[0];
         await db.activateAccount(user.token);
         res.render('index')
     }
    res.end();
});


module.exports = router