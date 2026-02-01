// my-react-app/src/pages/RecipesPage/RecipesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RecipeListCard from '../../components/RecipeCard/RecipeCard';
import './RecipesPage.css';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`);
        if (!res.ok) throw new Error('Failed to load recipes');

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message || 'Error loading recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="recipes-page">
      <Navbar />
      <div className="recipes-page-content">
        <h1 className="recipes-page-title">All Recipes</h1>

        {loading && <p>Loading recipes...</p>}
        {error && <p className="recipes-error">{error}</p>}

        <div className="recipes-grid">
          {!loading &&
            !error &&
            recipes.map((recipe) => (
              <RecipeListCard
                key={recipe.id}
                recipe={recipe}
                onView={() => handleViewRecipe(recipe.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;