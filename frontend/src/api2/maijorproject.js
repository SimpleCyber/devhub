import React, { useState } from "react";
import { Calendar } from 'lucide-react';
import "./maijorproject.css"

const MajorProjectItem = ({ name, date, link, isActive }) => {
  return (
    <div className={`project-card ${isActive ? "active" : ""}`}>
      <div className="project-header">
        <h2 className="project-title">
        Projects : <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h2>
        <div className="project-date">
          <Calendar className="date-icon" />
          <span>{date}</span>
        </div>
      </div>
      <div className="project-content">
        <iframe
          src={link}
          title={name}
          className="project-iframe"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  );
};

const majorProjects = [
  {
    name: "Portfolio",
    date: "12/Dec/2024",
    link: "https://simplecyber.github.io/Satyam/",
  },
  {
    name: "Fruit Classification ML",
    date: "11/Mar/2024",
    link: "https://fruit-classify.onrender.com/",
  },
  {
    name: "Learn React with 25 Projects",
    date: "14/Jan/2024",
    link: "https://learn-react-25.vercel.app/",
  },
];

export const MajorProject = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % majorProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + majorProjects.length) % majorProjects.length);
  };

  return (
    <div className="major-projects-container">
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevProject}>
          &#8592;
        </button>
        <div className="carousel-content">
          {majorProjects.map((project, index) => (
            <MajorProjectItem
              key={index}
              {...project}
              isActive={index === currentIndex}
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={nextProject}>
          &#8594;
        </button>
      </div>
      <div className="carousel-indicators">
        {majorProjects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};