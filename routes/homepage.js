var express = require('express');
var router = express.Router();
var db = require('../model/db');
var _ = require('lodash');

router.get('/', async function (req, res, next) {
    try {
        var id = req.session.GetId;
        let data = await db.getUsers('Male','Female', 'Randburg', '#gaming',5);
        res.render('homepage', {userdata: data})

    } catch (error) {
        console.log('error updating profile ',error.message)
    }
});


router.post('/', async function (req, res) {
    try {
        let search = await db.search();
        var options = req.body;
        let age = req.body.age.split('-');
        let fame = req.body.fame.split('-');
        options.min_age = Number(age[0]);
        options.max_age = Number(age[1]);
        options.min_fame = Number(fame[0]);
        options.max_fame = Number(fame[1]);

        delete options.age
        delete options.fame
        if (!req.body.interests) {
            delete options.interests;
        }
        else if (req.body.interests){
            options.interests = `#${options.interests}`;
        }
        if (!req.body.city) {
            delete options.city;
        }
        console.log(options)
        console.log("search object",search)
        let result = _.filter(search, (item) => {
            if (!options.interests && !options.city) {
                if ((item.age >= options.min_age && item.age <= options.max_age) &&
                    (item.famerating >= options.min_fame && item.famerating <= options.max_fame))
                    return item;
            }
            else if (options.interests && !options.city) {
                if ((item.age >= options.min_age && item.age <= options.max_age) &&
                    (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                    (item.interests == options.interests))
                    return item;
            }
            else if (!options.interests && options.city) {
                if ((item.age >= options.min_age && item.age <= options.max_age) &&
                    (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                    (item.city == options.city))
                    return item;
            }
            else if (options.interests && options.city) {
                if ((item.age >= options.min_age && item.age <= options.max_age) &&
                    (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                    (item.city == options.city) && (item.interests == options.interests))
                    return item;
            }
        });
        //console.log(result)
        res.render('homepage', { userdata: result });
    } catch (error) {
        console.log('error search ', error.message)
    }
})

module.exports = router;
