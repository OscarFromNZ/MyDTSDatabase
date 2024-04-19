const express = require('express');
const router = express.Router();

router.get('/backend', async (req, res) => {
    let databaseStructure = await req.app.database.getDatabaseStructure();
    res.render('backend', { databaseStructure, message: '' });
});

module.exports = router;