var express = require('express');
var router = express.Router();
const user = require('../models/users');
const passport = require('passport');


router.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(200).send(req.user);
    res.end();
});

router.post('/register', async function (req, res) {
    try {
        const userFormData = req.body;
        const result = await user.createUser(userFormData.username, userFormData.password);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});

router.get('/logout', function (req, res) {
    try {
        req.logout();
        res.status(200).send('Logged out.');
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});

module.exports = router;