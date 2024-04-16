const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.post('/delete/:formName', ensureAuthenticated, async (req, res) => {
    let tableName = req.app.database.getTableNameWithFormName(req.params.formName);

    let formBody = req.body;

    let query = '';

    console.log(formBody);
});

router.post('/create/:formName', ensureAuthenticated, async (req, res) => {
    let tableName = req.app.database.getTableNameWithFormName(req.params.formName);

    let formBody = req.body;

    let query = '';

    console.log(formBody);

});

module.exports = router;