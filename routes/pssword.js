var express = require('express');
var router = express.Router();
var con = require('../model/connection');

/*get*/
router.get('/', function(req, res, next){
    res.render('pssword');
});

router.post('/', function(req, res){
    if (req.method == "POST"){
        var password = req.body.newPassword;
        var comfirm = req.body.comfirmPassword;
        if(!password || ! comfirm){
            res.status("400");
            res.end();
        }else{
             
        }
    }
})


 module.exports = router;