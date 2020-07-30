var express = require('express');
var router = express.Router();
var uploadImage = require('../logic/uploadImage');
var con = require('../model/connection');
var db = require('../model/db');

/*Get*/
router.get('/', async function (req, res, next) {
    try {
        var id = req.session.GetId;
        let data = await db.getUsers('Male','Female', 'Randburg', '#gaming',5);
        res.render('homepage', {userdata: data})

    } catch (error) {
        console.log('error updating profile ',error.message)
    }
});

router.post('/',async function(req, res){
    try {
        //let result = _.filter(req.body, {} )
        console.log(req.body)
         let search = await db.search();
        // _.filter(search, )
        
         res.redirect('homepage');
    } catch (error) {
        console.log('error search ',error.message)
    }
})

module.exports = router;
