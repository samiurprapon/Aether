import React, { useState } from 'react';
import './AuthPage.css';
import eyeImage from '../../../assets/eye-image.jpg';

const AuthPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="auth-left">
        <h1 className={`heading ${isDarkMode ? 'dark-heading' : 'light-heading'}`}>Welcome back!</h1>
        <form className="auth-form">
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
      <div className="auth-right">
        <img src={eyeImage} alt="Showcase" />
      </div>
    </div>
  );
};

export default AuthPage;
