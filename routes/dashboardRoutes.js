const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    res.render('dashboard');
});

module.exports = router;