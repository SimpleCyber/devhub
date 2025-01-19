import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Code } from "lucide-react";
import { MapPin, Trophy, Star, User } from "lucide-react";
import "./leetcode.css";

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {
    const submission = payload[0].payload.submission;
    const xPos = coordinate.x;
    const yPos = coordinate.y;

    // Calculate if tooltip should appear above or below the point
    const above = yPos > 100; // Show above if point is in lower half

    return (
      <div
        className="custom-tooltip"
        style={{
          position: "absolute",
          left: `${xPos}px`,
          top: above ? `${yPos - 120}px` : `${yPos + 20}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="tooltip-title">
          <Code size={14} />
          <span>{submission.title}</span>
        </div>
        <div className="tooltip-meta">
          <span className="language">{submission.lang}</span>
          <span className={`status ${submission.statusDisplay.toLowerCase()}`}>
            {submission.statusDisplay}
          </span>
          <span className="time">
            {new Date(submission.timestamp * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const LeetCodeStats = ({ profile }) => {
  // Modified submission data processing to include full submission data
  const processSubmissionData = (submissions) => {
    return submissions
      .map((submission, index) => ({
        name: index,
        value: submissions.length - index,
        submission: submission, // Include full submission data for tooltip
      }))
      .reverse();
  };

  // Get counts by difficulty
  const getDifficultyCounts = () => {
    const stats = profile.matchedUser.submitStats.acSubmissionNum;
    return {
      easy: stats.find((s) => s.difficulty === "Easy")?.count || 0,
      medium: stats.find((s) => s.difficulty === "Medium")?.count || 0,
      hard: stats.find((s) => s.difficulty === "Hard")?.count || 0,
    };
  };

  const counts = getDifficultyCounts();

  return (
    <>
    <h2 className="full-name">Leetcode</h2>
    <div className="leetcode-card">
      <div className="card-left">
        <div className="profile-circle">
          <img
            className="profile-circle"
            src={profile.matchedUser.profile.userAvatar}
            alt="avatar"
          />
        </div>
        <div className="leet-profile-info">
          <div className="info-item">
            <User size={14} />
            <span className="value">@{profile.matchedUser.username}</span>
          </div>
          <div className="info-item">
            <MapPin size={14} />
            <span className="value">
              {profile.matchedUser.profile.countryName}
            </span>
          </div>
          <div className="info-item">
            <Trophy size={14} />
            <span className="value">{profile.matchedUser.profile.ranking}</span>
          </div>
          <div className="info-item">
            <Star size={14} />
            <span className="value">
              {profile.matchedUser.profile.reputation}
            </span>
          </div>
        </div>

        <div className="badges-section">
          <h3>Badges</h3>
          <div className="badges-container">
            {profile.matchedUser.badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <img src={badge.icon} alt={badge.displayName} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-right">
        <div className="problem-stats">
          <h3>Problem solved</h3>
          <div className="difficulty-boxes">
            <div className="diff-box easy">
              <div className="count">{counts.easy}</div>
              <div className="label">Easy</div>
            </div>
            <div className="diff-box medium">
              <div className="count">{counts.medium}</div>
              <div className="label">Medium</div>
            </div>
            <div className="diff-box hard">
              <div className="count">{counts.hard}</div>
              <div className="label">Hard</div>
            </div>
          </div>
        </div>

        <div className="submission-graph">
          <h3>Recent Submissions</h3>
          <ResponsiveContainer className="graph" width="110%" height={150}>
            <LineChart
              className="graph2"
              data={processSubmissionData(profile.recentSubmissionList)}
            >
              <CartesianGrid strokeDasharray="6 6 " stroke="#eee" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#333"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#fff",
                  stroke: "#333",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#333",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <XAxis
                dataKey="name"
                stroke="#999"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#999" }}
                axisLine={{ stroke: "#999" }}
              />
              <YAxis
                stroke="#999"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#999" }}
                axisLine={{ stroke: "#999" }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                position={{ x: 0, y: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeetCodeStats;
