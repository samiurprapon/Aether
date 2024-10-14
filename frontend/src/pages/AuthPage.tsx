import React, { useState } from 'react';
import { FaBars, FaHome, FaMoon, FaSun } from 'react-icons/fa'; // Importing the hamburger and moon/sun icons
import './AuthPage.css';
import eyeImage from '../../../assets/eye-image.jpg';

const AuthPage: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showMenu, setShowMenu] = useState(false); // State for menu toggle

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
			{/* Top Bar */}
			<div className={`top-bar ${isDarkMode ? 'dark' : 'light'}`}>
				<div className="top-bar-left">
					<h1 className={`aether-name ${isDarkMode ? 'dark' : 'light'}`}>Aether</h1>
				</div>
				<div className="top-bar-right">
					{isDarkMode ? (
						<FaSun className="dark-mode-icon" onClick={toggleDarkMode} />
					) : (
						<FaMoon className="dark-mode-icon" onClick={toggleDarkMode} />
					)}
					<FaBars className="menu-icon" onClick={toggleMenu} />
				</div>
			</div>
			{showMenu && (
				<div className={`dropdown-menu ${isDarkMode ? 'dark' : 'light'} ${showMenu ? 'show' : ''}`}>
					<div className="signup-button">signup</div>
					<div className="home-button">
						<FaHome />
						Home
					</div>
				</div>
			)}
			<div className="auth-content">
				<div className="auth-left">
					<h1 className={`heading ${isDarkMode ? 'dark-heading' : 'light-heading'}`}>Welcome back!</h1>
					<form className="auth-form">
						<input type="email" placeholder="Email Address" required />
						<input type="password" placeholder="Password" required />
						<div className="auth-options">
							<label>
								<input type="checkbox" /> Remember Me
							</label>
							<a href="#" className="forgot-password">
								Forgot Password?
							</a>
						</div>
						<button type="submit">Log in</button>
					</form>
				</div>
				<div className="auth-right">
					<img src={eyeImage} alt="Showcase" />
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
