const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.post('/delete/:formName', ensureAuthenticated, async (req, res) => {
    let formName = req.params.formName;

    let tableName = req.app.database.getTableNameWithFormName(formName);

    let formBody = req.body;

    let deleteQuery= `DELETE FROM ${tableName} WHERE ${req.app.database.capitalizeFirstLetter(formName)}ID = ${req.body.CustomerID}`;

    console.log(formBody);

    req.app.database.executeQuery(deleteQuery, function(result) {
        console.log(result);
        res.redirect(`/switchboard/form/${formName}?message=Successfully deleted customer with ID ${req.body.CustomerID}`);
    });
});

router.post('/create/:formName', ensureAuthenticated, async (req, res) => {
    let formName = req.params.formName;
    let tableName = req.app.database.getTableNameWithFormName(formName);
    let formBody = req.body;

    if (formBody.Newsletter) {
        let newsletter = formBody.Newsletter.toLowerCase() === 'yes' ? 1 : 0;
        formBody.Newsletter = newsletter;
    }

    let fieldNames = Object.keys(formBody).join(", ");
    let fieldValues = Object.values(formBody).map(value => `'${value}'`).join(", ");

    let insertQuery = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${fieldValues})`;

    req.app.database.executeQuery(insertQuery, function(result) {
        console.log(result);
        res.redirect(`/switchboard/form/${formName}?message=Successfully added new ${formName}`);
    });
});


module.exports = router;