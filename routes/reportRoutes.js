const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuthenicated');

router.get('/switchboard/report/booksByCustomer', ensureAuthenticated, async (req, res) => {
    // number of orders per customer (aka number of books)
    const query = `SELECT tblCustomers.CustomerID, tblCustomers.FirstName, tblCustomers.LastName, COUNT(tblOrders.Quantity) AS TotalBooks FROM tblCustomers, tblOrders WHERE tblCustomers.CustomerID = tblOrders.CustomerID GROUP BY tblCustomers.CustomerID`;

    req.app.database.executeQuery(query, function(results) {
        console.log(results);
        res.render('booksByCustomer', { results, message: '' });
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
    let orderID = req.query.orderID;

    // I'm dulpicating this query so much oops
    const query = `SELECT tblOrders.CustomerID, tblOrders.PriceNZD, tblOrders.Quantity, tblOrders.OrderDate, tblOrders.ISBN, tblBooks.Title, CONCAT(tblCustomers.FirstName, ' ', tblCustomers.LastName) AS FullName, CONCAT(tblCustomers.Street, ' ', tblCustomers.StreetNumber, ', ', tblCustomers.Suburb) AS Address, tblCustomers.PostCode FROM tblOrders, tblCustomers, tblBooks WHERE tblOrders.OrderID = ${orderID} AND tblCustomers.CustomerID = tblOrders.CustomerID AND tblBooks.ISBN = tblOrders.ISBN;`;

    req.app.database.executeQuery(query, function(results) {
        console.log(results);
        res.render('packingSlip', { results, orderID, message: '' });
    });});

router.get('/switchboard/report/salesByAuthor', ensureAuthenticated, async (req, res) => {
    // number of orders per customer (aka number of books)
    const query = `SELECT tblAuthors.AuthorID, tblAuthors.FirstName, tblAuthors.LastName, COUNT(tblBooks.ISBN) AS NumberOfBooks FROM tblBooks, tblAuthors WHERE tblBooks.AuthorID = tblAuthors.AuthorID GROUP BY tblAuthors.AuthorID, tblAuthors.FirstName, tblAuthors.LastName;`;

    req.app.database.executeQuery(query, function(results) {
        console.log(results);
        res.render('salesByAuthor', { results, message: '' });
    });
});

/*
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
*/


module.exports = router;