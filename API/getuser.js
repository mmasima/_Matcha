var express = require('express')
var router = express.Router();
var con = require('../model/connection');
var db = require('../model/db')
var global;

/* GET home page. */
router.get('/:username', async function (req, res) {
    try {
        let user = await db.getUserByUsername(req.params.username)
        global = user;
        console.log(global);
        res.render('viewprofile', {
             data: user,
             })
    } catch (error) {
        console.log(error)
    }
    res.render('viewprofile', { message: req.flash('message') });
});


router.post('/', function (req, res) {
    if (req.method == 'POST') {
        var like = 1;
        var id = global.id;

        var check = `SELECT * FROM profile WHERE profile_id ='${id}'`
        con.query(check, function (err, results, fields) {
            if (err) throw err;
            if (results[0].famerating <= 10) {
                like = like + results[0].famerating;
            }
            else if (results[0].famerating == 10){
                req.flash('message', 'you liked this person!');
                res.redirect('/homepage');
            }
        var iLike = `UPDATE profile SET famerating='${like}' where profile_id = '${id}'`;
        con.query(iLike, (err, result) => {
            if(err) throw err;
            req.flash('message', 'you liked this person!');
            res.redirect('/homepage');
            })
        });
    };
});



module.exports = router;
