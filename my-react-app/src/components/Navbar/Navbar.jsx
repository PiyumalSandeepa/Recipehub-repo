import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-menu">
        <Link to="/" className="nav-item">MY RECIPETIN</Link>
        <Link to="/" className="nav-item">NEW COOKBOOK!</Link>
        <Link to="/recipes" className="nav-item">RECIPES</Link>
        <Link to="/" className="nav-item">BY CATEGORY</Link>
        <Link to="/" className="nav-item">MY FOOD BANK</Link>
        <Link to="/" className="nav-item">ABOUT</Link>
        <Link to="/login" className="nav-item nav-user">
          <i className="fas fa-user"></i>
          <span className="nav-user-text">LOGIN</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
