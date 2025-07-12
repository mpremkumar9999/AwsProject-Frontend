import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // CSS in the same folder

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="main-title">TaskMaster Pro</h1>
        <p className="tagline">Your productivity powerhouse</p>
        
        <div className="cta-buttons">
          <button 
            className="cta-btn primary"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button 
            className="cta-btn secondary"
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Instant task updates across all devices</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎨</div>
          <h3>Beautiful UI</h3>
          <p>Enjoy working with our intuitive design</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔐</div>
          <h3>Bank-Grade Security</h3>
          <p>Your data is always protected</p>
        </div>
      </div>
    </div>
  );
}