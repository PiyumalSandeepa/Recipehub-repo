import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Homepage.css';
import loginImage from '../../assets/images/heroimage.jpg';

const quickDinnerRecipes = [
  {
    title: "One pot chicken risoni with crispy salami",
    date: "Jan 31, 2024",
    comments: 148,
    tag: "QUICK & EASY",
    description: "Delicious one pot chicken risoni with crispy salami, perfect for a quick dinner.",
    image: loginImage,
  },
  {
    title: "Thai Coconut Pumpkin Soup",
    date: "Aug 9, 2023",
    comments: 190,
    tag: "QUICK & EASY",
    description: "Creamy and flavorful Thai coconut pumpkin soup that's both comforting and healthy.",
    image: loginImage,
  },
  {
    title: "Arayes – Lebanese Meat-Stuffed Crispy Pita",
    date: "Jul 31, 2023",
    comments: 165,
    tag: "QUICK & EASY",
    description: "Crispy pita bread stuffed with seasoned meat, a Lebanese classic you will love.",
    image: loginImage,
  },
  {
    title: "Beef chow mein (ground/mince recipe!)",
    date: "Jul 3, 2023",
    comments: 124,
    tag: "QUICK & EASY",
    description: "Quick and tasty beef chow mein using ground beef for an easy dinner.",
    image: loginImage,
  },
  
];

const Homepage = () => {
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
            From classic comfort foods to modern culinary creations — explore, cook, and share your love for food.
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

      {/* Existing Latest Recipes Section */}
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
              Cajun Baked Salmon Bites is just a really tasty, no-fuss way to cook salmon, fast (12 minutes!).
              Cut into cubes so the Cajun flavour hits every bite, then bake in a hot oven so it browns without
              overcooking the inside. No stove splatter, yay!
            </p>

            <button className="recipe-button">
              GET THE RECIPE →
            </button>
          </div>
        </div>
      </section>

      {/* New Quick Dinner Suggestions Section */}
      <section className="quick-dinner-suggestions">
        <h2 className="quick-title">SOME QUICK DINNER SUGGESTIONS!</h2>

        <div className="quick-dinner-grid">
          {quickDinnerRecipes.map((recipe, index) => (
            <div className="quick-dinner-card" key={index}>
              <div
                className="quick-dinner-image"
                style={{ backgroundImage: `url(${recipe.image})` }}
              >
                <span className="quick-tag">{recipe.tag}</span>
              </div>

              <div className="quick-dinner-meta">
                <span>💬 {recipe.comments}</span>
                <span>📅 {recipe.date}</span>
              </div>

              <h3 className="quick-dinner-title">{recipe.title}</h3>

              <p className="quick-dinner-desc">{recipe.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
