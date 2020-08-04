var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.get('/',async function(req, res){
    var username = req.session.username;

    var view = await db.getHistory(username)

  
res.render('viewhistory', {interactions:view})
})

module.exports = router;