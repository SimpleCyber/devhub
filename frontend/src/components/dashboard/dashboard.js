import React, { useEffect, useState } from "react";
import { Sidebar } from "../sidebar/sidebar";
import {
  Github,
  Code2,
  Linkedin,
  Link2,
  ArrowUpRight,
  GitFork,
  Users,
} from "lucide-react";
import "./dashboard.css";
import useFetchPlatformData from "../../api2/data";
import GitHubCard from "../../api2/github";
import "../../api2/github.css";
import LeetCodeStats from "../../api2/leetcode";
import LinkedInProfile from "../../api2/linkedin";
import { MajorProject } from "../../api2/maijorproject";

const MetricCard = ({ icon: Icon, title, value, subValue, color, details }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      <div className={`icon-bg ${color}`}>
        <Icon />
      </div>
    </div>
    <div className="straight">
      <div className="card-value">{value}</div>
      <div className="card-subvalue">{subValue}</div>
    </div>

    {details && (
      <div className="card-details">
        {details.map((detail, index) => (
          <span key={index}>
            <detail.icon />
            {detail.value} {detail.label}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const { linkedinData, githubData, leetcodeData } = useFetchPlatformData();
  // const { githubData, leetcodeData } = useFetchPlatformData();

  const metrics = [
    {
      icon: Github,
      title: "GitHub",
      value: "24",
      subValue: "Public Repository",
      color: "orange",
      details: [
        { icon: GitFork, value: "8", label: "commits" },
        { icon: ArrowUpRight, value: "9", label: "Pull requests" },
      ],
    },
    {
      icon: Code2,
      title: "Leetcode",
      value: "81",
      subValue: "Solved",
      color: "yellow",
      details: [
        { icon: ArrowUpRight, value: "43", label: "Streak" },
        { icon: ArrowUpRight, value: "35", label: "Longest" },
      ],
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "10",
      subValue: "Total Posts",
      color: "blue",
      details: [
        { icon: Users, value: "500", label: "Followers" },
        { icon: Users, value: "32", label: "Following" },
      ],
    },
    {
      icon: Link2,
      title: "Job Readiness",
      value: "65%",
      subValue: "Field : Web Development",
      color: "green",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const components = [
    <GitHubCard data={githubData} />,
    <LeetCodeStats profile={leetcodeData} />,
    <LinkedInProfile demoData={linkedinData} />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [components.length]);

  return (

    <>
    <Sidebar />
    <div className="dashboard-container">
      <h1>Hello! Satyam Yadav</h1>
      <p className="subtitle">Welcome back! Check your progress here</p>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="projects-grid">
        <div className="card">
          {components[currentIndex]}
          {/* <LinkedInProfile demoData={linkedinData} />
            <GitHubCard data={githubData} />
            <LeetCodeStats profile={leetcodeData} /> */}
        </div>

        <div className="card">
          <MajorProject />
        </div>
      </div>
    </div>
    </>
  );
}
