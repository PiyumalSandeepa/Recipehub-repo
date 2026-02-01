// src/pages/MyFoodBank/MyFoodBankPage.jsx
import React, { useEffect, useState } from 'react';
import './MyFoodBankPage.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import MyRecipeCard from '../../components/MyRecipeCard/MyRecipeCard';

const MyFoodBankPage = () => {
  const user = getCurrentUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/user/${user.id}`
        );
        if (!res.ok) throw new Error('Failed to load your recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message || 'Error loading recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [user.id]);

  const handleViewEdit = (id) => {
    navigate(`/my-food-bank/recipe/${id}`);
  };

  const handleAddNew = () => {
    navigate('/my-food-bank/recipe/new');
  };

  return (
    <div className="my-food-bank-page">
      <div className="my-food-bank-header">
        <h1>My Food Bank</h1>
        <button className="add-recipe-button" onClick={handleAddNew}>
          + Add New Recipe
        </button>
      </div>

      <div className="my-food-bank-profile">
        <h2>My Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h2 className="my-recipes-title">My Recipes</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="my-recipes-grid">
        {!loading &&
          !error &&
          recipes.map((recipe) => (
            <MyRecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewEdit={() => handleViewEdit(recipe.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MyFoodBankPage;