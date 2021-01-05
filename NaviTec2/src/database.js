const mysql = require ('mysql');
const {promisify} = require ('util');

const { database } = require ('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if ( err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DB CONNECTION LOST');
        }

        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DB WITH MANY CONNECTIONS');
        }

        if (err.code === 'ECONNREFUSED'){
            console.error('DB Connection refused');
        }
    }
    if (connection) connection.release();
    console.log("Connected");
    return;
});


pool.query = promisify(pool.query);

module.exports = pool;