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

// Get all recipes
router.get('/', getRecipes);

// Get recipes by user
router.get('/user/:userId', getRecipesByUser);

// Get single recipe
router.get('/:id', getRecipeById);

// Create recipe
router.post('/', createRecipe);

// Update recipe
router.put('/:id', updateRecipe);

// Delete recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
