var express = require("express");
var router = express.Router();
var con = require("../model/connection");
var db = require("../model/db");
var global;
const session = require("express-session");
var no = 'no';
var yes = 'yes';
var checkLike;

/* GET home page. */
router.get("/:username", async function (req, res) {
    try {
        var myId = req.session.GetId;
        var username = req.session.username;
        var viewed = req.params.username
        let user = await db.getUserByUsername(viewed);
        likedId = user.id;
        var checker = await db.checkLikes(myId, user.id);
        if (checker == undefined) {
            await db.insertLikes(myId, likedId, no);
            var checker = await db.checkLikes(myId, user.id);
        }
        checkLike = checker;
        global = user;
        res.render("viewprofile", {
            data: user,
            check: checker,
            message: req.flash("message")
        });
        let view = await db.insertHistory(username, viewed)
        console.log('seee' + view)
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async function (req, res) {
    var id = global.id;
    try {
        var like = 1;
        var likedId = global.id;
        var MyId = req.session.GetId;
        await db.getProfile(id)
        if (req.body.like) {
            if (checkLike.type == 'yes') {
                await db.updateLikes(MyId, likedId, no);
                req.flash("message", "you unliked this person!");
            }
            else if (checkLike.type == 'no') {
                await db.updateLikes(MyId, likedId, yes);
            }
        } else if (req.body.block) {
            await db.updateBlock(id);
            req.flash("message", "you blocked this person!");
            res.redirect("/homepage");
        } else if (req.body.fakeaccount) {
            await db.updateFakeAcc(id);
            req.flash("message", "you reported this person as a fakeaccount!");
            res.redirect("/homepage");
        }

    } catch (error) {
        res.redirect('/');
    }
});

module.exports = router;
