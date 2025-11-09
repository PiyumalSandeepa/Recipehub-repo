import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPage.css';
import loginImage from "../../assets/images/login.jpg"; // Make sure this path matches your project structure

const RecipesPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Temporary mock data - replace with actual API call later
  const mockRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper",
      image: loginImage,
      cookTime: "30 mins",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      description: "Grilled chicken chunks in spiced curry sauce",
      image: loginImage,
      cookTime: "45 mins",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with classic Caesar dressing",
      image: loginImage,
      cookTime: "15 mins",
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Beef Burger",
      description: "Juicy beef patty with fresh vegetables and special sauce",
      image: loginImage,
      cookTime: "25 mins",
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake with ganache",
      image: loginImage,
      cookTime: "60 mins",
      difficulty: "Hard"
    },
    {
      id: 6,
      title: "Sushi Roll",
      description: "Fresh salmon and avocado sushi roll",
      image: loginImage,
      cookTime: "40 mins",
      difficulty: "Hard"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="recipes-loading">
        <div className="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <h1>Our Recipes</h1>
        <p>Discover our collection of delicious recipes</p>
      </div>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-difficulty">{recipe.difficulty}</div>
            </div>
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-footer">
                <span className="cook-time">
                  <i className="far fa-clock"></i> {recipe.cookTime}
                </span>
                <button 
                  className="view-recipe-btn"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;