// Import necessary packages
let mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Initialize app
const app = express();

/*
// Create connection with SQL database
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'mydatabase'
});

// Connect to SQL database and log "Connected!" on success as well as the result
con.connect(function (err, result) {
    if (err) throw err;
    console.log('Connected!', result);

    con.query('SELECT * FROM customers', function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
*/

const homeRoutes = require('./routes/homeRoutes');

websiteInit();
async function websiteInit() {
    // Set 'views' directory for any views 
    // being rendered res.render()
    app.set('views', path.join(__dirname, 'views'));

    // Set template html thingy to EJS
    app.set('view engine', 'ejs');

    // Set /public to being the JS and CSS source
    app.use(express.static(path.join(__dirname, 'public')));

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // parse application/json
    app.use(express.json());

    // Setting up session
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: 'auto' }
    }));

    // Routes to be used
    app.use(homeRoutes);

    // Listen on port 3000
    app.listen(3000, () => {
        console.log('Server is running on port 3000, http://localhost:3000');
    });
}