import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Github,
  Linkedin,
  Code2,
  MapPin,
  Mail,
  Users,
  Star,
  GitFork,
  MessageCircle,
  Repeat,
  Heart,
  Clock,
} from 'lucide-react';
import './DashboardPage.css';

const defaultLinkedinData = {
  userPhoto: "",
  name: "Default User",
  location: "Unknown",
  bio: "I am a software developer.",
  topPosts: [],
};

const defaultLeetcodeData = {
  totalSolved: 0,
  easy: 0,
  medium: 0,
  hard: 0,
  submissionHistory: [],
};

const defaultGithubData = {
  email: "Not Provided",
  followers: 0,
  following: 0,
  publicRepos: 0,
  topProjects: [],
};

const DashboardPage = ({
  leetcodeData = defaultLeetcodeData,
  linkedinData = defaultLinkedinData,
  githubData = defaultGithubData,
}) => {
  return (
    <div className="dashboard-container">
      {/* Profile Card */}
      <div className="profile-section glass-effect">
        <div className="profile-header">
          <img
            src={linkedinData?.userPhoto || "https://fallback-url"}
            alt={linkedinData?.name || "Default User"}
            className="profile-photo"
          />
          <div className="profile-info">
            <h1>{linkedinData?.name || "Default User"}</h1>
            <div className="location">
              <MapPin size={16} />
              <span>{linkedinData?.location || "Unknown"}</span>
            </div>
            <p className="bio">{linkedinData?.bio || "Bio not provided."}</p>
          </div>
        </div>
      </div>

      {/* LeetCode Stats */}
      <div className="leetcode-section glass-effect">
        <div className="section-header">
          <Code2 size={24} />
          <h2>LeetCode Progress</h2>
        </div>

        <div className="leetcode-stats">
          <div className="total-solved">
            <h3>{leetcodeData?.totalSolved || 0}</h3>
            <p>Problems Solved</p>
          </div>

          <div className="difficulty-badges">
            <div className="badge easy">
              <span>{leetcodeData?.easy || 0}</span>
              Easy
            </div>
            <div className="badge medium">
              <span>{leetcodeData?.medium || 0}</span>
              Medium
            </div>
            <div className="badge hard">
              <span>{leetcodeData?.hard || 0}</span>
              Hard
            </div>
          </div>
        </div>

        <div className="submission-graph">
          <h3>Recent Submissions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leetcodeData?.submissionHistory || []}>
              <Line type="monotone" dataKey="submissions" stroke="#ff9800" strokeWidth={2} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GitHub Stats */}
      <div className="github-section glass-effect">
        <div className="section-header">
          <Github size={24} />
          <h2>GitHub Activity</h2>
        </div>

        <div className="github-stats">
          <div className="stat-item">
            <Mail size={16} />
            <span>{githubData?.email || "Not Available"}</span>
          </div>
          <div className="stat-item">
            <Users size={16} />
            <span>
              {githubData?.followers || 0} followers · {githubData?.following || 0} following
            </span>
          </div>
          <div className="stat-item">
            <GitFork size={16} />
            <span>{githubData?.publicRepos || 0} repositories</span>
          </div>
        </div>

        <div className="top-projects">
          <h3>Top Projects</h3>
          {githubData?.topProjects.map((project, index) => (
            <div key={index} className="project-card glass-effect">
              <img src={project.image || "https://fallback-image"} alt={project.name} />
              <div className="project-info">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="project-stats">
                  <span>
                    <Star size={14} /> {project.stars}
                  </span>
                  <span>
                    <GitFork size={14} /> {project.forks}
                  </span>
                  <span>
                    <MessageCircle size={14} /> {project.issues}
                  </span>
                </div>
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Posts */}
      <div className="linkedin-section glass-effect">
        <div className="section-header">
          <Linkedin size={24} />
          <h2>Recent LinkedIn Activity</h2>
        </div>

        <div className="linkedin-posts">
          {linkedinData?.topPosts.map((post, index) => (
            <div key={index} className="post-card glass-effect">
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="post-content">
                <p>{post.content}</p>
                <div className="post-stats">
                  <span>
                    <Heart size={14} /> {post.reactions}
                  </span>
                  <span>
                    <MessageCircle size={14} /> {post.comments}
                  </span>
                  <span>
                    <Repeat size={14} /> {post.reposts}
                  </span>
                  <span>
                    <Clock size={14} /> {post.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
