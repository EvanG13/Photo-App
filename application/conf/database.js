const mysql = require('mysql2');

/* Create the connection pool */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csc317db',
    password: '1234',
    port: '3307',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();