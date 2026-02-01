// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123',
  database: process.env.DB_NAME || 'recipehub',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test the connection with full error details
db.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('SQL State:', err.sqlState);
    console.error('Full Error:', err);
    console.error('Connection details:', {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'recipehub'
    });
  });

module.exports = db;