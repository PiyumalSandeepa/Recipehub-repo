// my-react-app/src/components/RecipeListCard/RecipeListCard.jsx
import React from 'react';
import './RecipeListCard.css';
import fallbackImage from '../../assets/images/heroimage.jpg';

const RecipeListCard = ({ recipe, onView }) => {
  const image =
    recipe.image_url && recipe.image_url.trim() !== ''
      ? recipe.image_url
      : fallbackImage;

  return (
    <div className="recipe-list-card">
      <div
        className="recipe-list-card-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="recipe-list-card-body">
        <h3 className="recipe-list-card-title">{recipe.title}</h3>
        {recipe.publisher && (
          <p className="recipe-list-card-publisher">By {recipe.publisher}</p>
        )}
        <p className="recipe-list-card-desc">
          {recipe.description && recipe.description.length > 120
            ? recipe.description.slice(0, 120) + '...'
            : recipe.description}
        </p>
        <div className="recipe-list-card-meta">
          {recipe.tag && <span>{recipe.tag}</span>}
          <span>📅 {recipe.date}</span>
          <span>💬 {recipe.comments}</span>
        </div>
        <button className="recipe-list-card-button" onClick={onView}>
          View Recipe →
        </button>
      </div>
    </div>
  );
};

export default RecipeListCard;