var express = require("express");
var router = express.Router();
var con = require("../model/connection");
var db = require("../model/db");
const session = require("express-session");
var global;
var no = 'no';
var yes = 'yes';
var checkLike;

/* GET home page. */
router.get("/:username", async function (req, res) {
  try {
    var myId = req.session.GetId;
    let user = await db.getUserByUsername(req.params.username);
    global = user;
    var username = req.session.username;
    var viewed = req.params.username
    likedId = user.id;
    var checker = await db.checkLikes(myId, user.id);
    if (checker == undefined) {
      await db.insertLikes(myId, likedId, no);
      var checker = await db.checkLikes(myId, user.id);
    }
    checkLike = checker;
    console.log('me' + username)
    console.log('yes' + viewed)
    let user = await db.getUserByUsername(viewed);
    global = user;
    res.render("viewprofile", {
      data: user,
      check: checker,
      message: req.flash("message")
    });
  }
  catch (error) {
    console.log(error);
  }
});

router.post('/', async function (req, res) {
  if (req.method == "POST") {
    var like = 1;
    var likedId = global.id;
    var MyId = req.session.GetId;

    try {
      if (checkLike.type == 'yes') {
        let insertLikes = await db.updateLikes(MyId, likedId, no);
        req.flash("message", "you unliked this person!");
      }
      else if (checkLike.type == 'no') {
        await db.updateLikes(MyId, likedId, yes);
      }
      let view = await db.insertHistory(username, viewed);
      var check = `SELECT * FROM profile WHERE profile_id ='${likedId}'`;
      con.query(check, function (err, results, fields) {
        if (err) throw err;
        if (results[0].famerating <= 9) {
          newlike = results[0].famerating + like;
          console.log(newlike);
          var iLike = `UPDATE profile SET famerating='${newlike}' where profile_id = '${likedId}'`;
          con.query(iLike, (err, result) => {
            if (err) throw err;
            res.redirect("/homepage");
          });
        } else {
          res.redirect("/homepage");
          res.end();
        }
      });

      if (req.body.block) {
        var block = await db.updateBlock(id);
        req.flash("message", "you blocked this person!");
        res.redirect("/homepage");
      }
      else if (req.body.fakeaccount) {
        var fakeacc = await db.updateFakeAcc(id);
        req.flash("message", "you reported this person as a fakeaccount!");
        res.redirect("/homepage");
      }
    }
    catch (error) {
      console.group(error);
    }
  }
});

module.exports = router;
