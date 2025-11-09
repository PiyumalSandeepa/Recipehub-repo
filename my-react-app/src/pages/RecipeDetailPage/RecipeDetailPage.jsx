import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Temporary mock data - replace with actual API call later
  const mockRecipeDetails = {
    id: id,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper",
    image: `https://source.unsplash.com/1200x800/?pasta`,
    cookTime: "30 mins",
    prepTime: "15 mins",
    totalTime: "45 mins",
    difficulty: "Medium",
    servings: 4,
    calories: "650 kcal",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano, grated",
      "100g Parmigiano-Reggiano, grated",
      "2 cloves garlic, minced",
      "Black pepper, freshly ground",
      "Salt to taste",
      "Extra virgin olive oil"
    ],
    instructions: [
      "Bring a large pot of salted water to boil for the pasta",
      "While waiting for the water, mix eggs, grated cheese, and black pepper in a bowl",
      "Cook pancetta in a large pan until crispy, then set aside",
      "Cook pasta according to package instructions until al dente",
      "Reserve 1 cup of pasta water before draining",
      "Combine hot pasta with pancetta",
      "Add egg mixture to pasta, stirring quickly",
      "Add pasta water as needed to create a creamy sauce",
      "Serve immediately with extra cheese and black pepper"
    ],
    nutrition: {
      protein: "28g",
      carbohydrates: "72g",
      fats: "32g",
      fiber: "3g"
    },
    tips: [
      "Use room temperature eggs for better sauce consistency",
      "Don't overcook the pasta - it should be al dente",
      "Stir quickly when adding the egg mixture to prevent scrambling",
      "Fresh ingredients will give the best results"
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecipe(mockRecipeDetails);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="recipe-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-header">
        <button className="back-button" onClick={() => navigate('/recipes')}>
          <i className="fas fa-arrow-left"></i> Back to Recipes
        </button>
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span><i className="far fa-clock"></i> Prep: {recipe.prepTime}</span>
          <span><i className="fas fa-fire"></i> Cook: {recipe.cookTime}</span>
          <span><i className="fas fa-users"></i> Serves: {recipe.servings}</span>
          <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <div className="recipe-detail-content">
        <div className="recipe-main-image">
          <img src={recipe.image} alt={recipe.title} />
        </div>

        <div className="recipe-description">
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-info-grid">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-nutrition">
            <h2>Nutrition Information</h2>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="label">Calories</span>
                <span className="value">{recipe.calories}</span>
              </div>
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <div key={key} className="nutrition-item">
                  <span className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="recipe-tips">
          <h2>Chef's Tips</h2>
          <ul>
            {recipe.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;