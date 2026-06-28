/**
 * db.js — MySQL Connection Pool
 * Author  : VIKNESH V
 * Company : RD INFRO TECHNOLOGY
 *
 * Uses a connection pool instead of a single connection
 * for better performance under concurrent requests.
 */

const mysql  = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host              : process.env.DB_HOST     || 'localhost',
  user              : process.env.DB_USER     || 'root',
  password          : process.env.DB_PASSWORD || '',
  database          : process.env.DB_NAME     || 'viknesh_taskdb',
  waitForConnections: true,
  connectionLimit   : 10,
  queueLimit        : 0,
});

// Validate connection at startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed ▶', err.message);
    console.error('   Check your .env DB credentials.');
    return;
  }
  console.log('✅ MySQL connected — Database:', process.env.DB_NAME);
  connection.release();
});

module.exports = pool.promise();
