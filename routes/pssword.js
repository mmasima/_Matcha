var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*get*/
router.get('/', function(req, res, next){
    res.render('pssword');
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "000000",
	database: "matcha"
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