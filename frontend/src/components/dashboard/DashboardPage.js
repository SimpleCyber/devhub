import React, { useState, useEffect } from 'react';
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
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { Alert, AlertDescription } from '../ui/alert';

import './DashboardPage.css';


const DashboardPage = () => {
  // State for each platform's data and loading/error states
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [linkedinData, setLinkedinData] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch data for each platform
  useEffect(() => {
    const fetchLeetcodeData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/leetcode/dearcoder/`);
        setLeetcodeData(response.data);
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          leetcode: "Unable to fetch LeetCode data. Please try again later."
        }));
      }
    };

    const fetchGithubData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/github/SimpleCyber/`);
        setGithubData(response.data);
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          github: "Unable to fetch GitHub data. Please try again later."
        }));
      }
    };

    const fetchLinkedinData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/linkedin/dearcoder-satyam/`);
        setLinkedinData(response.data);
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          linkedin: "Unable to fetch LinkedIn data. Please try again later."
        }));
      }
    };

    // Start all fetches concurrently
    fetchLeetcodeData();
    fetchGithubData();
    fetchLinkedinData();
  }, []);

  const renderError = (platform) => {
    if (errors[platform]) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors[platform]}</AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container ">
      {/* Profile Section */}
      <div className="profile-section glass-effect ">
        {renderError('linkedin')}
        {linkedinData ? (
          <div className="profile-header ">
            <img
              src={linkedinData.profilePicture || "/api/placeholder/100/100"}
              alt={linkedinData.Name || "Profile"}
              className="profile-photo"
            />
            <div className="profile-info">
              <h1>{linkedinData.Name || "Name not available"}</h1>



              <div className="location">
                <MapPin size={16} />
                <span>{linkedinData.Location || "Location not available"}</span>
              </div>
              <p className="bio">{linkedinData.Bio || "Bio not available"}</p>
            </div>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LeetCode Section */}
      <div className="leetcode-section glass-effect ">
        {renderError('leetcode')}
        <div className="section-header">
          <Code2 size={24} />
          <h2 >LeetCode Progress</h2>
        </div>

        {leetcodeData ? (
          <>
            <div className="leetcode-stats ">
              <div className="total-solved">
                <h3>
                  {leetcodeData?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count || 0}
                </h3>
                <p>Problems Solved</p>
              </div>


              <div className="difficulty-badges">
                {leetcodeData?.matchedUser?.submitStats?.acSubmissionNum?.map((stat, index) => (
                  <div key={index} className={`badge ${stat.difficulty.toLowerCase()} p-2 rounded-lg text-center`}>
                    <span className="block text-lg font-bold">{stat.count}</span>
                    {stat.difficulty}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        )}
      </div>



      {/* GitHub Section */}
      <div className="github-section glass-effect">
        {renderError('github')}
        <div className="section-header ">
          <Github size={24} />
          <h2 >GitHub Activity</h2>
        </div>

        {githubData ? (
          <>
            <div className="github-stats ">
              <div className="stat-item">
                <Mail size={16} />
                <span>{githubData.profile.email || "Email not available"}</span>
              </div>

              <div className="stat-item ">
                <Users size={16} />
                <span>
                  {githubData.profile.followers || 0} followers · {githubData.profile.following || 0} following
                </span>
              </div>
              <div className="stat-item">
                <GitFork size={16} />
                <span>{githubData.profile.public_repos || 0} repositories</span>
              </div>
            </div>

            <div className="top-projects">
              <h3>Top Projects</h3>
              <div className="space-y-4">
                {githubData.top_repositories.map((repo, index) => (
                  <div key={index} className="project-card p-4 rounded-lg bg-white bg-opacity-50">
                    <h4 className="font-bold">{repo.name}</h4>
                    <p className="text-sm text-gray-600">{repo.language}</p>
                    <div className="mt-2">
                      <a
                        href={repo.html_url}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        )}
      </div>

      {/* LinkedIn Posts Section */}
      <div className="linkedin-section glass-effect ">
        {renderError('linkedin')}
        <div className="section-header">
          <Linkedin size={24} />
          <h2 >Recent LinkedIn Activity</h2>
        </div>

        {linkedinData?.Posts ? (
          <div className="linkedin-posts ">
            {linkedinData.Posts.slice(0, 3).map((post, index) => (
              <div key={index} className="post-card p-4 rounded-lg bg-white bg-opacity-50">
                <p className="mb-2">{post.Caption}</p>
                <div className="post-stats flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Heart size={14} /> {post['Total Reactions']}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> {post.Comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat size={14} /> {post.Reposts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;