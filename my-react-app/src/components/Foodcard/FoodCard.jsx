import React from "react";
import "./FoodCard.css";
import heroImage from "../../assets/images/login.jpg"; // Make sure this path matches your project structure

const FoodCard = ({ title, date, user, description }) => {
  return (
    <div className="food-card">
      <div className="food-card-image">
        <img src={heroImage} alt={title} />
      </div>
      <div className="food-card-content">
        <div className="food-card-meta">
          <span className="food-date">
            <i className="fa fa-calendar"></i> {date}
          </span>
          <span className="food-user">
            <i className="fa fa-user"></i> {user}
          </span>
        </div>
        <h3 className="food-title">{title}</h3>
        <p className="food-description">{description}</p>
      </div>
    </div>
  );
};

export default FoodCard;
