// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipesByUser,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

// All recipes
router.get('/', getRecipes);

// Recipes of a specific user
router.get('/user/:userId', getRecipesByUser);

// Single recipe
router.get('/:id', getRecipeById);

// Create new recipe
router.post('/', createRecipe);

// Update recipe (owner only)
router.put('/:id', updateRecipe);

// Delete recipe (owner only)
router.delete('/:id', deleteRecipe);

module.exports = router;