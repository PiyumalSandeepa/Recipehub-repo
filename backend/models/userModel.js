const db = require('../db');

// Create table if not exists
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      )
    `);
    console.log('✅ users table ready');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
})();

const User = {
  async create({ name, username, email, password }) {
    const [result] = await db.query(
      `INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)`,
      [name, username, email, password]
    );
    return { id: result.insertId, name, username, email };
  },

  async findByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  },

  async verifyUser(email, password) {
    const [rows] = await db.query(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );
    return rows[0];
  }
};

module.exports = User;
