import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Brand */}
        <div className="footer-logo">
          <span className="logo-text">RecipeHub</span>
        </div>


        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@recipehub.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Food Street, Flavor Town</p>
        </div>

        
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">YT</a>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
