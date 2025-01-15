// src/components/welcome/WelcomePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const WelcomePage = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to DevHub!</h1>
      <h2>Hello {email || 'Guest'} 👋</h2>
    </div>
  );
};

export default WelcomePage;
