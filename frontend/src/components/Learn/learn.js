import React from 'react';
import { Sidebar } from '../sidebar/sidebar';
import './learn.css';

const Learn = () => {
  return (
    <div className="learn-container">
      <Sidebar />
      <div className="learn-content">
        <h1>Learning Resources</h1>
        <div className="learn-grid">
          <div className="learn-card">
            <h2>Data Structures</h2>
            {/* Add content */}
          </div>
          <div className="learn-card">
            <h2>Algorithms</h2>
            {/* Add content */}
          </div>
          <div className="learn-card">
            <h2>System Design</h2>
            {/* Add content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;