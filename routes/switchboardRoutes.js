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

router.get('/switchboard/form/:formName', ensureAuthenticated, async (req, res) => {
    let formName = req.params.formName;

    let tableName = "";

    switch (formName) {
        case "customer":
            tableName = "tblCustomers";
        break;

        case "book":
            tableName = "tblBooks";
        break;

        case "order":
            tableName = "tblOrders";
    }

    let query = `DESCRIBE ${tableName}`;

    req.app.database.executeQuery(query, function (tableData) {
        res.render('form', { message: '', tableData, formName });
    });
});

router.get('/switchboard/report/:reportName', ensureAuthenticated, async (req, res) => {
    // get data for report (layout as well as actual stuff)
    let reportName = req.params.reportName;
    let reportLayoutData = req.app.reportDataGetter.get(reportName);

    res.render(reportName, { message: '', reportData });
});

module.exports = router;


// wait, I think we only need the query data and we cna do the if statements in the html