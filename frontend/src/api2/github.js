import React, { useMemo } from 'react';
import { MapPin, Mail, Users, GitFork, Book, GitCommit, Star, User } from 'lucide-react';
import './github.css';

// Language colors as a constant
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

const GitHubCard = ({ data }) => {
  // Process data with error handling using useMemo
  const processedData = useMemo(() => {
    if (!data) return null;

    const profile = data.profile || {};
    const top_repositories = data.top_repositories || [];
    const contributions = data.contributions || {};

    return {
      profile: {
        avatar: profile.avatar || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        full_name: profile.full_name || 'Unknown User',
        email: profile.email || profile.username || 'No email provided',
        username: profile.username || 'unknown',
        location: profile.location || 'Location not specified',
        followers: profile.followers || 0,
        following: profile.following || 0,
        public_repos: profile.public_repos || 0,
      },
      top_repositories: top_repositories
        .filter(repo => repo && repo.name) // Filter out invalid repos
        .map(repo => ({
          name: repo.name,
          html_url: repo.html_url || '#',
          language: repo.language || 'Unknown',
          description: repo.description || 'No description provided'
        })),
      contributions
    };
  }, [data]);

  // Loading state
  if (!data) {
    return <div className="github-card loading">Loading GitHub data...</div>;
  }

  // Error state
  if (!processedData) {
    return <div className="github-card error">Unable to load GitHub data</div>;
  }

  const { profile, top_repositories } = processedData;

  // Get language color with error handling
  const getLanguageColor = (language) => {
    if (!language) return '#8b949e';
    return LANGUAGE_COLORS[language] || '#8b949e';
  };

  return (
    <>
      <h2 className="full-name">GitHub</h2>
      <div className="github-card">
        <div className="profile-container">
          <img 
            src={profile.avatar}
            alt={profile.full_name}
            className="avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
            }}
          />
          <div className="profile-details">
            <div className="info-items">
              <div className="info-item">
                <Mail size={16} />
                <span title={profile.email}>{profile.email}</span>
              </div>
              
              <div className="info-item">
                <MapPin size={16} />
                <span title={profile.location}>{profile.location}</span>
              </div>
              
              <div className="info-item">
                <Users size={16} />
                <span>{profile.followers.toLocaleString()} followers</span>
              </div>

              <div className="info-item">
                <User size={16} />
                <span>{profile.following.toLocaleString()} following</span>
              </div>
              
              <div className="info-item">
                <Book size={16} />
                <span>{profile.public_repos.toLocaleString()} Public Repo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="repositories-section">
          <h3>Top Repositories</h3>
          <div className="repo-list">
            {top_repositories.length > 0 ? (
              top_repositories.map((repo, index) => (
                <div key={`${repo.name}-${index}`} className="repo-item">
                  <div className="repo-header">
                    <Book size={16} className="repo-icon" />
                    <a 
                      href={repo.html_url}
                      className="repo-name"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={repo.name}
                    >
                      {repo.name}
                    </a>
                  </div>
                  <div className="repo-meta">
                    {repo.language && (
                      <>
                        <span 
                          className="language-dot" 
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="language-name">{repo.language}</span>
                      </>
                    )}
                    <GitCommit size={16} className="commit-icon" />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-repos">No repositories available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GitHubCard;