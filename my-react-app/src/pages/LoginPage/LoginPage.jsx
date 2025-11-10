import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(' Login successful!');
        console.log('User:', data);
        navigate('/'); 
      } else {
        alert(` Login failed: ${data.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(' Server error. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        <div className="login-card">
          <h2 className="welcome-text">Welcome</h2>
          <p className="login-prompt">
            Log in with your email address and password
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <div className="signup-section">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="signup-link"
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
