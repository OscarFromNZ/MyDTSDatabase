const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.get('/switchboard', ensureAuthenticated, async (req, res) => {
    let message = '';

    if (req.query.message) {
        message = req.query.message;
    }

    res.render('switchboard', { message: message });
});

module.exports = router;