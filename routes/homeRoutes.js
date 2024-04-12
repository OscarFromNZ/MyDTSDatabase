const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home', { message: '' });
    //res.redirect('login');
});

module.exports = router;