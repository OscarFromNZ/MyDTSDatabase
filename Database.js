let mysql = require('mysql');

class Database {
    constructor() {
        this.con = null;
    }

    async init(password) {
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: password,
            database: 'mydatabase'
        });
        
        // Connect to SQL database and log "Connected!" on success as well as the result
        this.con.connect(function (err, result) {
            if (err) throw err;
            console.log('Connected to SQL database succssfully!', result);
        });
    }

    executeQuery(query, callback) {
        this.con.query(query, function (err, result, fields) {
            console.log('executing query ' + query);
            if (err) throw err;
            return callback(result);
        });
    }

    getTableNameWithFormName(formName) {
        return ('tbl' + this.capitalizeFirstLetter(formName) + 's');
    }

    // I know it's dumb having it here but I couldn't be bothered putting it anywhere else, maybe I'll make a utils thing later
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

module.exports = Database;