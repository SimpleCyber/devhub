import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';



import LeetCodeProfile from './components/leetcode';
import GitHubProfile from './components/github';
import LinkedinProfile from './components/linkedin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LeetCodeProfile />

    <GitHubProfile />

    <LinkedinProfile />
  </React.StrictMode>
);

reportWebVitals();
