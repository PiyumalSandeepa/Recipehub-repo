const db = require('../db'); // Use the project's db.js connection pool

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in findByEmail:', error);
      throw error;
    }
  }

  static async create({ name, username, email, password }) {
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
        [name, username, email, password]  // Plain text password
      );
      return { id: result.insertId, name, username, email };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  // ⭐ ADD THIS METHOD FOR LOGIN (without bcrypt)
  static async verifyUser(email, password) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return null;  // User not found
      }

      // Compare plain text passwords
      if (user.password !== password) {
        return null;  // Wrong password
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error in verifyUser:', error);
      throw error;
    }
  }
}

module.exports = User;