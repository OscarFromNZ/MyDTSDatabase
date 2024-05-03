const express = require('express');
const router = express.Router();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.get('/switchboard/', ensureAuthenticated, async (req, res) => {
    let message = '';
    if (req.query.message) {
        message = req.query.message;
    }

    res.render('switchboard', { message: message });
});

// prob could put this in formRoutes
router.get('/switchboard/form/:formName', ensureAuthenticated, async (req, res) => {
    let message = '';
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

router.get('/switchboard/mailmerge/newsletter-export-to-csv', ensureAuthenticated, async (req, res) => {
    const query = "SELECT CustomerID, CONCAT(firstName, ' ', lastName) AS fullName FROM tblCustomers WHERE Newsletter = 1;";

    req.app.database.executeQuery(query, async (results) => {
        const csvWriter = createCsvWriter({
            path: './out.csv',
            header: [
                { id: 'CustomerID', title: 'CustomerID' },
                { id: 'fullName', title: 'fullName' }
            ]
        });

        await csvWriter.writeRecords(results);
        res.download('./out.csv', 'download.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('file download failed');
            }
        });
    });
});

router.get('/switchboard/mailmerge/packingslip-export-to-csv', ensureAuthenticated, async (req, res) => {
    let orderID = req.query.orderID;

    const query = `SELECT tblOrders.CustomerID, tblOrders.PriceNZD, tblOrders.Quantity, tblOrders.OrderDate, tblOrders.ISBN, tblBooks.Title, CONCAT(tblCustomers.FirstName, ' ', tblCustomers.LastName) AS FullName, CONCAT(tblCustomers.Street, ' ', tblCustomers.StreetNumber, ', ', tblCustomers.Suburb) AS Address, tblCustomers.PostCode FROM tblOrders, tblCustomers, tblBooks WHERE tblOrders.OrderID = ${orderID} AND tblCustomers.CustomerID = tblOrders.CustomerID AND tblBooks.ISBN = tblOrders.ISBN;`;

    req.app.database.executeQuery(query, async (results) => {
        console.log(results);
        const csvWriter = createCsvWriter({
            path: './packingslip-out.csv',
            header: [
                { id: 'CustomerID', title: 'CustomerID' },
                { id: 'PriceNZD', title: 'PriceNZD' },
                { id: 'Quantity', title: 'Quantity' },
                { id: 'OrderDate', title: 'OrderDate' },
                { id: 'ISBN', title: 'ISBN' },
                { id: 'FullName', title: 'FullName' },
                { id: 'Address', title: 'Address' },
                { id: 'PostCode', title: 'PostCode' },
                { id: 'Title', title: 'Title' }
            ]
        });

        await csvWriter.writeRecords(results);
        res.download('./packingslip-out.csv', 'download.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('file download failed');
            }
        });
    });
});

module.exports = router;