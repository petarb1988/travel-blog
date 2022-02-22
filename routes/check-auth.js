const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send('Not logged in.');
}


module.exports.isAuthenticated = isAuthenticated;