var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var con = require("../model/connection");
var db = require("../model/db");
const saltRound = 10;
var email;
var token;

/*get*/
router.get("/", function (req, res, next) {
  email = req.query.email;
  token = decodeURIComponent(req.query.token);
  if (email && token) {
    console.log("okay" + req.query.email);
    console.log("nooo" + req.query.token);
    console.log(token + "  token");
    res.render("pssword", { message: req.flash("message") });
  } else {
    res.render("frgotpsswrd");
  }
  res.end();
});

//console.log('token'+token);

router.post("/", async function (req, res) {
  var password = req.body.newPassword;
  var confirm = req.body.confirmPassword;
  //var email = req.query.email;
  //var token  = req.query.token;

  if (!password || !confirm) {
    res.status("400");
    req.flash("message", "an error occured");
        res.redirect("pssword");
    res.end();
  } else {
    if (password === confirm) {
      try {
        console.log(token.trim());

        let newPassword = await bcrypt.hash(password, saltRound);
        let user = await db.findUserByToken(token);
        user = user[0];
        await db.updateUserPassword(newPassword, user.username);
        res.redirect("/");
      } catch (error) {
        console.log("error updating password ", error.message);
        req.flash("message", "error updating password");
        res.redirect("pssword");
      }
    }
  }
});

module.exports = router;
