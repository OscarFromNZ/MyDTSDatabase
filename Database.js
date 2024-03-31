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
        
            con.query('SELECT * FROM customers', function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        });
    }
}

module.exports = Database;