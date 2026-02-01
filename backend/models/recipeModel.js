// backend/models/recipeModel.js
const db = require('../db');

// Ensure recipes table exists and has needed columns
(async () => {
  try {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS recipes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NULL,
          title VARCHAR(255) NOT NULL,
          publisher VARCHAR(255),
          description TEXT,
          tag VARCHAR(100),
          date VARCHAR(50),
          comments INT DEFAULT 0,
          image_url VARCHAR(500),
          extra_images TEXT,
          prep_time VARCHAR(50),
          cook_time VARCHAR(50),
          difficulty VARCHAR(50),
          servings INT,
          calories VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // For older tables, ensure columns exist
      try {
        await db.query(
          'ALTER TABLE recipes ADD COLUMN user_id INT NULL AFTER id'
        );
      } catch (err) {
        if (err.code !== 'ER_DUP_FIELDNAME') throw err;
      }

      try {
        await db.query(
          'ALTER TABLE recipes ADD COLUMN extra_images TEXT NULL AFTER image_url'
        );
      } catch (err) {
        if (err.code !== 'ER_DUP_FIELDNAME') throw err;
      }

      console.log('✓ recipes table is ready');
    } catch (dbErr) {
      if (dbErr.code === 'ECONNREFUSED') {
        console.warn('⚠ Database not available - will retry on first request');
      } else {
        throw dbErr;
      }
    }
  } catch (err) {
    console.error('Error initializing recipes table:', err.message);
  }
})();

const Recipe = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT * FROM recipes ORDER BY created_at DESC'
    );
    return rows;
  },

  async getByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM recipes WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({
    user_id,
    title,
    publisher,
    description,
    tag,
    date,
    comments,
    image_url,
    extra_images,
    prep_time,
    cook_time,
    difficulty,
    servings,
    calories,
  }) {
    const extraImagesJson = JSON.stringify(extra_images || []);

    const [result] = await db.query(
      `INSERT INTO recipes
       (user_id, title, publisher, description, tag, date, comments,
        image_url, extra_images, prep_time, cook_time, difficulty, servings, calories)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        publisher,
        description,
        tag,
        date,
        comments ?? 0,
        image_url,
        extraImagesJson,
        prep_time,
        cook_time,
        difficulty,
        servings,
        calories,
      ]
    );

    return {
      id: result.insertId,
      user_id,
      title,
      publisher,
      description,
      tag,
      date,
      comments: comments ?? 0,
      image_url,
      extra_images: extra_images || [],
      prep_time,
      cook_time,
      difficulty,
      servings,
      calories,
    };
  },

  async update(id, userId, data) {
    const {
      title,
      publisher,
      description,
      tag,
      date,
      comments,
      image_url,
      extra_images,
      prep_time,
      cook_time,
      difficulty,
      servings,
      calories,
    } = data;

    const extraImagesJson = JSON.stringify(extra_images || []);

    const [result] = await db.query(
      `UPDATE recipes
       SET title = ?, publisher = ?, description = ?, tag = ?, date = ?,
           comments = ?, image_url = ?, extra_images = ?, prep_time = ?, cook_time = ?,
           difficulty = ?, servings = ?, calories = ?
       WHERE id = ? AND user_id = ?`,
      [
        title,
        publisher,
        description,
        tag,
        date,
        comments ?? 0,
        image_url,
        extraImagesJson,
        prep_time,
        cook_time,
        difficulty,
        servings,
        calories,
        id,
        userId,
      ]
    );

    if (result.affectedRows === 0) return null;
    return this.findById(id);
  },

  async delete(id, userId) {
    const [result] = await db.query(
      'DELETE FROM recipes WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = Recipe;