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

router.post('/', async function (req, res) {
  if (req.method == "POST") {
    var like = 1;
    var likedId = global.id;
    var MyId = req.session.GetId;
    try {

      let insertLikes = await db.insertLikes(MyId, likedId);
      console.log(insertLikes);

      var check = `SELECT * FROM profile WHERE profile_id ='${likedId}'`;
      con.query(check, function (err, results, fields) {
        if (err) throw err;
        if (results[0].famerating <= 9) {
          like = like + results[0].famerating;
          var iLike = `UPDATE profile SET famerating='${like}' where profile_id = '${likedId}'`;
          con.query(iLike, (err, result) => {
            if (err) throw err;
            req.flash("message", "you liked this person!");
            res.redirect("/homepage");
          });
        } else {
          req.flash("message", "you liked this person!");
          res.redirect("/homepage");
          res.end();
        }
      })
    } catch (error) {
      console.log("error liking ", error.message);
      res.redirect('/homepage');
    }
  }
});

module.exports = router;
