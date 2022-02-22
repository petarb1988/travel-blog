const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/db-models').User;
const validatePassword = require('./password-utils').validatePassword;


module.exports = function () {

    passport.use(new LocalStrategy(
        async function (username, password, cb) {
            try {
                const user = await User.findOne({ where: { username: username } });
                if (!user) {
                    return cb(null, false, { message: 'Incorrect username.' });
                }
                if (!validatePassword(password, user.hash, user.salt)) {
                    return cb(null, false, { message: 'Incorrect password.' });
                }
                return cb(null, user);
            }
            catch (err) {
                return cb(err);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findByPk(id);
            return done(null, user);
        }
        catch (err) {
            return done(err, null);
        }

    });

}