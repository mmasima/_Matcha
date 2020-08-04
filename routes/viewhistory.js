var express = require('express');
var router = express.Router();
var db = require('../model/db');
var _ = require('lodash')

router.get('/',async function(req, res){
    var arr = [];
    var username = req.session.username;

    var view = await db.getHistory(username)
    var likes = await db.getlikes(username)
    arr = _.concat(view, likes)
  
res.render('viewhistory', {interactions:arr})
})

module.exports = router;