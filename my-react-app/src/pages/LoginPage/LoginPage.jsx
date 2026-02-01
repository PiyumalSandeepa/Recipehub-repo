import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { setCurrentUser } from '../../utils/auth';
import { API_BASE_URL } from '../../config/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login to:', `${API_BASE_URL}/api/users/login`); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Login failed: ${response.status} - ${errorText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.user) {
        setCurrentUser(data.user);
      }

      alert('Login successful!');
      console.log('Logged-in user:', data.user);
      navigate('/my-food-bank');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    } finally {
      setLoading(false);
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
              disabled={loading}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" disabled={loading} /> Remember me
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
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
              disabled={loading}
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