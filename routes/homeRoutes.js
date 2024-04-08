const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('login');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    // check if login details are correct
    let query = `SELECT * FROM tblLogin WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;

    req.app.database.executeQuery(query, function(user) {
        console.log(query);
        console.log(user.length + ' user length');

        // if wrong, ask them again
        if (user.length == 0 || !user) {
            console.log('no user')
            res.redirect('login');
        } else {
            console.log('user')
            // if right, forward them to the dashboard
            res.redirect('dashboard');
        }
    });
});

module.exports = router;