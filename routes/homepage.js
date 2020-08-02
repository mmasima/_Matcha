var express = require('express');
var router = express.Router();
var db = require('../model/db');
var _ = require('lodash');
const { sortBy } = require('lodash');
const { eachOfLimit } = require('async');

router.get('/', async function (req, res) {
    try {
        let users = []
        var id = req.session.GetId;
        let { interests } = await db.getInterest(id);
        req.session.profile = await db.getProfile(id);
        let { gender, preference, city, famerating } = req.session.profile;
        users[id] = await db.getUsers(gender, preference, city, interests, famerating)
        req.session.users = users[id];
        res.render('homepage', { 
            userdata: users[id],
            message: req.flash('message'), 
        });
    } catch (error) {
        console.log('error updating profile ', error.message)
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
        else if (req.body.interests) {
            options.interests = `#${options.interests}`;
        }
        if (!req.body.city) {
            delete options.city;
        }
        if (options.min_age === 0 && options.max_age === 0) {
            delete options.min_age;
            delete options.max_age;
        }
        if (options.min_fame === 0 && options.max_fame === 0) {
            delete options.min_fame;
            delete options.max_fame;
        }
        let result = _.filter(search, (item) => {
            if ((!options.interests && !options.city) && (!options.min_age && !options.max_age) &&
                (!options.min_fame && !options.max_fame)) {
                return item;
            }
            else if ((options.interests && !options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                (item.interests == options.interests)) {
                return item;
            }
            else if ((!options.interests && options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                (item.city == options.city)) {
                return item;
            }
            else if ((options.interests && options.city) && (!options.min_age && !options.max_age) &&
                (!options.min_fame && !options.max_fame) &&
                (item.city == options.city) && (item.interests == options.interests)) {

                return item;
            }
            else if ((options.interests && !options.city) && (!options.min_age && !options.max_age) &&
                (!options.min_fame && !options.max_fame) && (item.interests == options.interests)) {
                return item;
            }
            else if ((!options.interests && options.city) && (!options.min_age && !options.max_age) &&
                (!options.min_fame && !options.max_fame) &&
                (item.city == options.city)) {
                return item;
            }
            else if ((!options.interests && !options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fam)) {
                // console.log('here' + item.age)
                return item;
            }
            else if ((item.age >= options.min_age && item.age <= options.max_age) && (!options.interests && !options.city) &&
                (!options.min_fame && !options.max_fame)) {
                // console.log('97')
                return item;
            }
            else if ((!options.interests && !options.city) && (!options.min_age && !options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame)) {
                return item;
            }
            else if ((options.interests && !options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (!options.min_fame && !options.max_fame) && (item.interests == options.interests)) {
                return item;
            }
            else if ((options.interests && !options.city) && (!options.min_age && !options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                (item.interests == options.interests)) {
                return item;
            }
            else if ((!options.interests && options.city) && (!options.min_age && !options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                (item.city == options.city)) {
                return item;
            }
            else if ((!options.interests && options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (!options.min_fame && !options.max_fame) &&
                (item.city == options.city)) {
                return item;
            }
            else if ((options.interests && options.city) && (item.age >= options.min_age && item.age <= options.max_age) &&
                (item.famerating >= options.min_fame && item.famerating <= options.max_fame) &&
                (item.city == options.city) && (item.interests == options.interests)) {
                return item;
            }

        });
        let sorted = [];
        if (options.sort == 'none') {
            //return res.render('homepage', { userdata: result })
        } else if (options.sort == 'age') {
            if (options.sort_method == 'asc') {
                sorted = _.orderBy(result, ['age'], 'asc');
                // return res.render('homepage', { userdata: sorted });
            } else {
                sorted = _.orderBy(result, ['age'], 'desc');
                //  return res.render('homepage', { userdata: sorted });
            }
        } else if (options.sort == 'fame') {
            if (options.sort_method == 'asc') {
                sorted = _.orderBy(result, ['fame'], 'asc');
                //  return res.render('homepage', { userdata: sorted });
            } else {
                sorted = _.orderBy(result, ['fame'], 'desc');
                // return res.render('homepage', { userdata: sorted });
            }
        }
        else if (options.sort == 'interest') {
            if (options.sort_method == 'asc') {
                sorted = _.orderBy(result, ['interests'], 'asc');
                //  return res.render('homepage', { userdata: sorted });
            } else {
                sorted = _.orderBy(result, ['interests'], 'desc');
                //  return res.render('homepage', { userdata: sorted });
            }

        }
        else if (options.sort == 'location') {
            if (options.sort_method == 'asc') {
                sorted = _.orderBy(result, ['city'], 'asc');
                //  return res.render('homepage', { userdata: sorted });
            } else {
                sorted = _.orderBy(result, ['city'], 'desc');
                // return res.render('homepage', { userdata: sorted });
            }
        }
        let filtered = [];
        console.log('filter')
        console.log(options)
        if (options.agefilter == 'filterage') {
            if (options.sort == 'none') {
                filtered = _.filter(result, { age: options.age_value })
            } else {
                filtered = _.filter(sorted, { age: options.age_value })

            }

        } else if (options.locationfilter == 'filterlocation') {
            if (options.sort == 'none') {
                filtered = _.filter(result, { location: options.city_value })
            } else {
                filtered = _.filter(sorted, { location: options.city_value })

            }

        } else if (options.interestsfilter == 'filterinterests') {
            if (options.sort == 'none') {
                filtered = _.filter(result, { interests: options.age_value })
            } else {
                filtered = _.filter(sorted, { interests: options.age_value })
            }

        } else if (options.famefilter == 'filterfame') {
            if (options.sort == 'none') {
                filtered = _.filter(result, { fame: options.fame_value })
            } else {
                filtered = _.filter(sorted, { fame: options.fame_value })

            }


        }
        if (sorted.length == 0 && filtered.length == 0) {
            return res.render('homepage', { userdata: result,
            message: req.flash('message'), });
        } else if (sorted.length > 0 && filtered.length == 0) {
            return res.render('homepage', { userdata: sorted,
            message: req.flash('message'), });
        } else if (filtered.length > 0) {
            return res.render('homepage', { userdata: filtered,
            message: req.flash('message'), });
        }
    } catch (error) {
        console.log('error search ', error.message)
    }
})

module.exports = router;
