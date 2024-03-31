const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.get('/login', async(req, res) => {
    // check if login details are correct
    let user = database.executeQuery(
        ''
    );
    // if wrong, ask them again
    // if right, forward them to the dashboard
});

module.exports = router;