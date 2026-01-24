// backend/controllers/recipeController.js
const Recipe = require('../models/recipeModel');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAll();
    res.json(recipes);
  } catch (err) {
    console.error('Get recipes error:', err);
    res.status(500).json({ message: 'Error getting recipes' });
  }
};

const getRecipesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.getByUserId(userId);
    res.json(recipes);
  } catch (err) {
    console.error('Get recipes by user error:', err);
    res.status(500).json({ message: 'Error getting user recipes' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.error('Get recipe by id error:', err);
    res.status(500).json({ message: 'Error getting recipe' });
  }
};

const createRecipe = async (req, res) => {
  try {
    const {
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
    } = req.body;

    if (!user_id || !title) {
      return res
        .status(400)
        .json({ message: 'user_id and title are required' });
    }

    const newRecipe = await Recipe.create({
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
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    console.error('Create recipe error:', err);
    res.status(500).json({ message: 'Error creating recipe' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const updated = await Recipe.update(id, user_id, req.body);

    if (!updated) {
      return res
        .status(404)
        .json({ message: 'Recipe not found or not owned by user' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Update recipe error:', err);
    res.status(500).json({ message: 'Error updating recipe' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const success = await Recipe.delete(id, user_id);

    if (!success) {
      return res
        .status(404)
        .json({ message: 'Recipe not found or not owned by user' });
    }

    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error('Delete recipe error:', err);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
};

module.exports = {
  getRecipes,
  getRecipesByUser,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};