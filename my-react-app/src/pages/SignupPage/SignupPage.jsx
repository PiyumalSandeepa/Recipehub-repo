import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(' Signup successful! You can now log in.');
        navigate('/login');
      } else {
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          alert(` Signup failed: ${parsedError.message || 'Unknown error'}`);
        } catch (e) {
          alert(' Signup failed: Server error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert(' Server error. Please try again later.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card-container">
        <div className="signup-card">
          <h2 className="create-account-text">Create an Account</h2>
          <p className="signup-prompt">Sign up to get started with Recipe Hub</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>

          <div
            className="login-section"
            style={{ marginTop: '20px', textAlign: 'center' }}
          >
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
