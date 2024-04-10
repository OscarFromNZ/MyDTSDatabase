const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
    let message = '';

    if (req.query.message) {
        message = req.query.message;
    }

    res.render('login', { message: message });
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    // get user
    let query = `SELECT * FROM tblLogin WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;

    req.app.database.executeQuery(query, function(user) {
        console.log(query);
        console.log(user.length + ' user length');

        // if wrong, ask them again
        if (user.length == 0 || !user) {
            console.log('no user')
            res.redirect('login?message=Incorrect username or password');
        } else {
            console.log('user')
            // if right, forward them to the dashboard
            req.session.access = true;
            res.redirect(`switchboard?message=Username and password correct! Welcome ${user[0].username}`);
        }
    });
});

module.exports = router;