// my-react-app/src/pages/Homepage/Homepage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Homepage.css';
import loginImage from '../../assets/images/heroimage.jpg';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recipes from backend when the page loads
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/recipes');

        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message || 'Error loading recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="homepage">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>

        <div className="hero-content">
          <h1 className="hero-title">Discover Delicious Recipes Every Day</h1>
          <p className="hero-subtitle">
            From classic comfort foods to modern culinary creations — explore,
            cook, and share your love for food.
          </p>
          <button className="cta-button">
            GET RECIPE <span className="arrow">→</span>
          </button>
        </div>

        <button className="favorite-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Latest Recipes (static for now) */}
      <section className="latest-recipes">
        <h2 className="latest-title">LATEST RECIPES</h2>

        <div className="recipe-card">
          <div
            className="recipe-image"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>

          <div className="recipe-details">
            <h3 className="recipe-name">Cajun Baked Salmon Bites</h3>
            <div className="recipe-meta">
              <span className="recipe-tag">QUICK & EASY</span>
              <span className="recipe-date">📅 Nov 6, 2025</span>
              <span className="recipe-comments">💬 89</span>
            </div>

            <p className="recipe-description">
              Cajun Baked Salmon Bites is just a really tasty, no-fuss way to
              cook salmon, fast (12 minutes!). Cut into cubes so the Cajun
              flavour hits every bite, then bake in a hot oven so it browns
              without overcooking the inside. No stove splatter, yay!
            </p>

            <button className="recipe-button">GET THE RECIPE →</button>
          </div>
        </div>
      </section>

      {/* Quick Dinner Suggestions (dynamic from DB) */}
      <section className="quick-dinner-suggestions">
        <h2 className="quick-title">SOME QUICK DINNER SUGGESTIONS!</h2>

        {loading && <p>Loading recipes...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="quick-dinner-grid">
          {!loading &&
            !error &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;