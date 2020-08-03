var express = require("express");
var router = express.Router();
var con = require("../model/connection");
var db = require("../model/db");
var global;

/* GET home page. */
router.get("/:username", async function (req, res) {
  try {
    let user = await db.getUserByUsername(req.params.username);
    global = user;
    res.render("viewprofile", {
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
  res.render("viewprofile", { message: req.flash("message") });
});

router.post("/", async function (req, res) {

  var like = 1;
  var id = global.id;
  try {
     var check = await db.getProfile(id)
    if (req.body.like) {
      if (check[0].famerating <= 9) {
        like = like + check[0].famerating;
        var iLike = await db.updateFame(like, id)
        req.flash("message", "you liked this person!");
        res.redirect("/homepage");
      } else {
        req.flash("message", "you liked this person!");
        res.redirect("/homepage");
      }
    }else if (req.body.block) {
      var block = await db.updateBlock(id);
       req.flash("message", "you blocked this person!");
        res.redirect("/homepage");
    }else if(req.body.fakeaccount){
      var fakeacc = await db.updateFakeAcc(id);
      req.flash("message", "you reported this person as a fakeaccount!");
        res.redirect("/homepage");
    }

  } catch (error) {

  }


});

module.exports = router;
