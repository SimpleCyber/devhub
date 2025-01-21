import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
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

// demo data
  // const githubData = {
  //   profile: {
  //     avatar: "https://avatars.githubusercontent.com/u/583231?v=4",
  //     full_name: "John Doe",
  //     username: "johndoe",
  //     email: "john@example.com",
  //     location: "San Francisco, CA",
  //     followers: 1000,
  //     following: 500,
  //     public_repos: 50,
  //   },
  //   top_repositories: [
  //     {
  //       name: "awesome-project",
  //       html_url: "https://github.com/johndoe/awesome-project",
  //       language: "JavaScript",
  //     },
  //     {
  //       name: "cool-app",
  //       html_url: "https://github.com/johndoe/cool-app",
  //       language: "Python",
  //     },
  //     {
  //       name: "useful-tool",
  //       html_url: "https://github.com/johndoe/useful-tool",
  //       language: "Rust",
  //     },
  //   ],
  //   contributions: [
  //     { repo: "facebook/react", total: 150 },
  //     { repo: "vercel/next.js", total: 75 },
  //     { repo: "tailwindlabs/tailwindcss", total: 50 },
  //   ],
  //   detailed_statistics: [
  //     {
  //       repo: "awesome-project",
  //       commits: new Array(100),
  //       pull_requests: new Array(20),
  //       issues: new Array(30),
  //     },
  //     {
  //       repo: "cool-app",
  //       commits: new Array(80),
  //       pull_requests: new Array(15),
  //       issues: new Array(25),
  //     },
  //   ],
  // };

  // const leetcodeData = {
  //   matchedUser: {
  //     username: "pkc5uOVzbM",
  //     profile: {
  //       realName: "Satyam Yadav",
  //       aboutMe: "I am an engineering, and I can to solve problems ",
  //       company: null,
  //       school: "TVM",
  //       websites: [],
  //       countryName: "India",
  //       userAvatar:
  //         "https://assets.leetcode.com/users/pkc5uOVzbM/avatar_1718561176.png",
  //       reputation: 61,
  //       ranking: 1129659,
  //     },
  //     badges: [
  //       {
  //         name: "Annual Badge",
  //         icon: "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png",
  //         displayName: "50 Days Badge 2024",
  //       },
  //     ],
  //     submitStats: {
  //       acSubmissionNum: [
  //         {
  //           difficulty: "All",
  //           count: 96,
  //           submissions: 152,
  //         },
  //         {
  //           difficulty: "Easy",
  //           count: 45,
  //           submissions: 77,
  //         },
  //         {
  //           difficulty: "Medium",
  //           count: 43,
  //           submissions: 66,
  //         },
  //         {
  //           difficulty: "Hard",
  //           count: 8,
  //           submissions: 9,
  //         },
  //       ],
  //     },
  //   },
  //   allQuestionsCount: [
  //     {
  //       difficulty: "All",
  //       count: 3430,
  //     },
  //     {
  //       difficulty: "Easy",
  //       count: 852,
  //     },
  //     {
  //       difficulty: "Medium",
  //       count: 1786,
  //     },
  //     {
  //       difficulty: "Hard",
  //       count: 792,
  //     },
  //   ],
  //   recentSubmissionList: [
  //     {
  //       title: "Minimum Cost to Make at Least One Valid Path in a Grid",
  //       titleSlug: "minimum-cost-to-make-at-least-one-valid-path-in-a-grid",
  //       timestamp: "1737223774",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Maximum Difference Between Adjacent Elements in a Circular Array",
  //       titleSlug:
  //         "maximum-difference-between-adjacent-elements-in-a-circular-array",
  //       timestamp: "1737213075",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Neighboring Bitwise XOR",
  //       titleSlug: "neighboring-bitwise-xor",
  //       timestamp: "1737097891",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Power of Two",
  //       titleSlug: "power-of-two",
  //       timestamp: "1737020716",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Power of Two",
  //       titleSlug: "power-of-two",
  //       timestamp: "1737020704",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Power of Two",
  //       titleSlug: "power-of-two",
  //       timestamp: "1737020541",
  //       statusDisplay: "Runtime Error",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Power of Two",
  //       titleSlug: "power-of-two",
  //       timestamp: "1737020479",
  //       statusDisplay: "Wrong Answer",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Bitwise XOR of All Pairings",
  //       titleSlug: "bitwise-xor-of-all-pairings",
  //       timestamp: "1737019950",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Bitwise XOR of All Pairings",
  //       titleSlug: "bitwise-xor-of-all-pairings",
  //       timestamp: "1737018829",
  //       statusDisplay: "Time Limit Exceeded",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Bitwise XOR of All Pairings",
  //       titleSlug: "bitwise-xor-of-all-pairings",
  //       timestamp: "1737018745",
  //       statusDisplay: "Memory Limit Exceeded",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Minimize XOR",
  //       titleSlug: "minimize-xor",
  //       timestamp: "1736960200",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Minimize XOR",
  //       titleSlug: "minimize-xor",
  //       timestamp: "1736960015",
  //       statusDisplay: "Wrong Answer",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Minimize XOR",
  //       titleSlug: "minimize-xor",
  //       timestamp: "1736931211",
  //       statusDisplay: "Wrong Answer",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Find the Prefix Common Array of Two Arrays",
  //       titleSlug: "find-the-prefix-common-array-of-two-arrays",
  //       timestamp: "1736877710",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Find the Prefix Common Array of Two Arrays",
  //       titleSlug: "find-the-prefix-common-array-of-two-arrays",
  //       timestamp: "1736877440",
  //       statusDisplay: "Compile Error",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Find the Prefix Common Array of Two Arrays",
  //       titleSlug: "find-the-prefix-common-array-of-two-arrays",
  //       timestamp: "1736877410",
  //       statusDisplay: "Compile Error",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Find the Prefix Common Array of Two Arrays",
  //       titleSlug: "find-the-prefix-common-array-of-two-arrays",
  //       timestamp: "1736877395",
  //       statusDisplay: "Compile Error",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Minimum Length of String After Operations",
  //       titleSlug: "minimum-length-of-string-after-operations",
  //       timestamp: "1736782522",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Check if a Parentheses String Can Be Valid",
  //       titleSlug: "check-if-a-parentheses-string-can-be-valid",
  //       timestamp: "1736705416",
  //       statusDisplay: "Accepted",
  //       lang: "cpp",
  //     },
  //     {
  //       title: "Check if a Parentheses String Can Be Valid",
  //       titleSlug: "check-if-a-parentheses-string-can-be-valid",
  //       timestamp: "1736652126",
  //       statusDisplay: "Wrong Answer",
  //       lang: "cpp",
  //     },
  //   ],
  // };

  // const linkedinData = {
  //   Username: "dearcoder-satyam",
  //   ProfilePicture:
  //     "https://media.licdn.com/dms/image/v2/D5603AQFCaY79z4ly5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721291308714?e=1743033600&v=beta&t=2Eb1aRj0PQb18lml1jhrvn00TL57zX3C7lZCRoiL87I",
  //   Bio: "Full Stack Software Developer skilled in both frontend and backend develop.35 CGPA.",
  //   Headline:
  //     "SIH'24 Winner 🥇|| Django || 5X Hackathon Winner || Peer Counsellor",
  //   Location: "Pune, Maharashtra",
  //   Education: [
  //     {
  //       SchoolName:
  //         "G.H. Raisoni Societys, College of Engineering and Management,Pune",
  //       Degree: "Bachelor of Technology - BTech",
  //       FieldOfStudy: "Computer Engineering",
  //       Grade: "9.41",
  //       StartYear: 2022,
  //       StartMonth: 11,
  //       EndYear: 2026,
  //       EndMonth: 6,
  //       URL: "https://www.linkedin.com/school/g.h.-raisoni-societys-college-of-engineering-and-management-pune/",
  //     },
  //   ],
  //   Position: [
  //     {
  //       CompanyName: "Externsclub Pvt Ltd",
  //       employmentType: "Internship",
  //       Industry: "Professional Training & Coaching",
  //       Location: "India",
  //       StartYear: 2023,
  //       StartMonth: 7,
  //       EndYear: 2024,
  //       EndMonth: 6,
  //       CompanyLogo:
  //         "https://media.licdn.com/dms/image/v2/C4D0BAQExDxJm8fVLDw/company-logo_400_400/company-logo_400_400/0/1661516984099/externsclub_logo?e=1745452800&v=beta&t=0v8H3Az-qasPShjClZkB7N_iXQjLjFFrPY2e1-d8usk",
  //     },
  //   ],
  //   Skills: [
  //     { Name: "Django", PassedSkillAssessment: true },
  //     { Name: "Flask", PassedSkillAssessment: false },
  //     { Name: "C++", PassedSkillAssessment: false },
  //     { Name: "Python ", PassedSkillAssessment: false },
  //     { Name: "DSA", PassedSkillAssessment: true },
  //   ],
  // };

// done ⚠️

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

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
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
    </div>
  );
}
