const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.get('/switchboard/report/booksByCustomer', ensureAuthenticated, async (req, res) => {
    //const query = `SELECT title, author FROM tblBooks`;

    req.app.database.executeQuery(query, function(result) {
        res.render('booksByCustomer', { books: result, message: '' });
    });
});

router.get('/switchboard/report/newsletter', ensureAuthenticated, async (req, res) => {
    const query = `SELECT CustomerID, CONCAT(firstName, ' ', lastName) AS fullName FROM tblCustomers WHERE Newsletter = 1`; // 1 means yes

    req.app.database.executeQuery(query, function(results) {
        // results is an array where results[0].CustomerID and results[0].FirstName
        res.render('newsletter', { results, message: '' });
    });
});

router.get('/switchboard/report/packingSlip', ensureAuthenticated, async (req, res) => {
    res.render('packingSlip', { message: '' });
});

router.get('/switchboard/report/salesByAuthor', ensureAuthenticated, async (req, res) => {
    res.render('salesByAuthor', { message: '' });
});

router.get('/create/:formName', ensureAuthenticated, async (req, res) => {
    let formName = req.params.formName;
    let tableName = req.app.database.getTableNameWithFormName(formName);
    let formBody = req.body;

    let newsletter = formBody.Newsletter.toLowerCase() === 'yes' ? 1 : 0;
    formBody.Newsletter = newsletter;

    let fieldNames = Object.keys(formBody).join(", ");
    let fieldValues = Object.values(formBody).map(value => `'${value}'`).join(", ");

    let insertQuery = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${fieldValues})`;

    req.app.database.executeQuery(insertQuery, function(result) {
        console.log(result);
        res.redirect(`/switchboard/form/${formName}?message=Successfully added new ${formName}`);
    });
});


module.exports = router;