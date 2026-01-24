// src/components/MyRecipeCard/MyRecipeCard.jsx
import React from 'react';
import './MyRecipeCard.css';
import fallbackImage from '../../assets/images/heroimage.jpg';

const MyRecipeCard = ({ recipe, onViewEdit }) => {
  const image =
    recipe.image_url && recipe.image_url.trim() !== ''
      ? recipe.image_url
      : fallbackImage;

  return (
    <div className="my-recipe-card">
      <div
        className="my-recipe-card-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="my-recipe-card-body">
        <h3>{recipe.title}</h3>
        <p className="my-recipe-card-date">📅 {recipe.date}</p>
        <p className="my-recipe-card-desc">
          {recipe.description && recipe.description.length > 100
            ? recipe.description.slice(0, 100) + '...'
            : recipe.description}
        </p>
        <button className="my-recipe-card-button" onClick={onViewEdit}>
          View / Edit →
        </button>
      </div>
    </div>
  );
};

export default MyRecipeCard;