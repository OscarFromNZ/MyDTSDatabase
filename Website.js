const express = require('express');
const session = require('express-session');
const path = require('path');

const homeRoutes = require('./routes/homeRoutes');

class Website {
    constructor(port) {
        this.app = null;
        this.port = port;
    }

    async init(secret) {
        let app = express();
        
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
            secret: secret,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: 'auto' }
        }));

        // Routes to be used
        app.use(homeRoutes);

        // Listen on given port
        app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}, http://localhost:${this.port}`);
        });

        // I didn't want to define it earlier so that I didn't have to add this. to everything, I hope this is good practice
        this.app = app;
    }
}

module.exports = Website;