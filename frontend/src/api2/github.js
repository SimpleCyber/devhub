import React from 'react';
import { MapPin, Mail, Users, GitFork, Book, GitCommit, Star } from 'lucide-react';
import './github.css';

const GitHubCard = ({ data }) => {
  const { profile, top_repositories, contributions } = data;

  return (
       
    <>
    <h2 className="full-name">GitHub</h2>
    <div className="github-card">
      <div className="profile-container">
      <img 
          src={profile.avatar} 
          alt={profile.full_name}
          className="avatar"
        />
        <div className="profile-details">
          
          <div className="info-items">
            <div className="info-item">
              <Mail size={16} />
              <span>{profile.email}</span>
            </div>
            
            <div className="info-item">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
            
            <div className="info-item">
              <Users size={16} />
              <span>{profile.followers} followers </span>
              {/* <span> {profile.following} following</span> */}
            </div>
            
            <div className="info-item">
              <Book size={16} />
              <span>{profile.public_repos} repositories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="repositories-section">
        <h3>Top Repositories</h3>
        <div className="repo-list">
          {top_repositories.map((repo, index) => (
            <div key={index} className="repo-item">
              <div className="repo-header">
                <Book size={16} className="repo-icon" />
                <a href={repo.html_url} className="repo-name">{repo.name}</a>
              </div>
              <div className="repo-meta">
                <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                <span className="language-name">{repo.language}</span>
                <GitCommit size={16} className="commit-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  );
};

// Helper function to get language colors
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Rust: '#dea584',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };
  return colors[language] || '#8b949e';
};

export default GitHubCard;