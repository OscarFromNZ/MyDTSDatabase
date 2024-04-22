const express = require('express');
const router = express.Router();

router.get('/structure', async (req, res) => {
    let databaseStructure = await req.app.database.getDatabaseStructure();
    res.render('structure', { databaseStructure, message: '' });
});

router.get('/database', async (req, res) => {
    let tables = await req.app.database.getDatabaseStructure();
    res.render('database', { message: '', tables });
});

router.get('/database/:tableName', async (req, res) => {
    let tableName = req.params.tableName;

    /*
    // wait maybe don't even need to do this
    let tableLayoutDatas = await req.app.database.getDatabaseStructure();
    let tableLayoutDataIndex = 0;

    // I'm sure there's a 1 liner for this but who cares, I supose you could use .filter
    for (let i = 0; i < tableLayoutDatas.length; i++) {
        if (tableName = tableLayoutDatas[i].name) {
            tableLayoutDataIndex = i;
        }
    }
    // writing that for loop gave me a massive deja vu
    */

    let selectAllQuery = `SELECT * from ${tableName}`;

    req.app.database.executeQuery(selectAllQuery, function(rowData) {
        console.log(rowData);
        res.render(`tableview`, { message: '', rowData });
    });
});

module.exports = router;