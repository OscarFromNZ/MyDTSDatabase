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

// prob could put this in formRoutes
router.get('/switchboard/form/:formName', ensureAuthenticated, async (req, res) => {
    let message= '';
    if (req.query.message) {
        message = req.query.message;
    }

    let formName = req.params.formName;

    let tableName = req.app.database.getTableNameWithFormName(req.params.formName);

    let query = `DESCRIBE ${tableName}`;

    req.app.database.executeQuery(query, function (tableData) {
        res.render('form', { message, tableData, formName });
    });
});

module.exports = router;


// wait, I think we only need the query data and we cna do the if statements in the html