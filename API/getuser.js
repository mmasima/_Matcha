var express = require('express')
var router = express.Router();
var con = require('../model/connection');
var db = require('../model/db')


/* GET home page. */
router.get('/:username', async function(req, res) {
    try {
        let user = await db.getUserByUsername(req.params.username)
         res.render('viewprofile', {data:user})
        

    } catch (error) {
        console.log(error)
    }
 // res.render('viewprofile', { message: req.flash('message') });
});



module.exports = router;
