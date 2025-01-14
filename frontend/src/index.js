import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';

// import "./home/ModernHomePage.css"


// home 1
// import App from './home/App';

// home 2 -> ⭐
// import HomePage from './home/homepage';
import ModernHomePage from './home/ModernHomePage';


// auth 1 
import AuthPages from './auth/AuthPages';


import DashboardPage from './api/DashboardPage';



import LeetCodeProfile from './components/leetcode';
import GitHubProfile from './components/github';
import LinkedinProfile from './components/linkedin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <ModernHomePage />

    <AuthPages />

    <DashboardPage />


  </React.StrictMode>
);

reportWebVitals();
