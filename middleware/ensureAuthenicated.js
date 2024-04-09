function ensureAuthenticated(req, res, next) {
    if (req.session.access) { //do some fancy stuff here
        return next();
    }
    res.redirect('/login');
}

module.exports = ensureAuthenticated;