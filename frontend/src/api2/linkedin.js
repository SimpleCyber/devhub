import React from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Calendar,
  Link as LinkIcon,
  Workflow,
  Folders,
  Book,
} from "lucide-react";
import "./linkedin.css";

const LinkedInProfile = ({demoData}) => {
  // Demo data - you can replace this with API data later

  if (!demoData) {
    return <div>Loading LinkedIn data...</div>; // Handle case when demoData is null
  }


  const formatDate = (year, month) => {
    if (!year || !month) return "Present";
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="linkedin-container">
      <h2 className="full-name">Leetcode</h2>
        <div className="profile-content">


          <div className="profile-info">

            
            <img
              src={demoData.ProfilePicture}
              alt="Profile"
              className="profile-image"
            />
            
            <div className="profile-details">
              <div className="name">
                <User className="icon" />
                <p className="profile-name">{demoData.Username}</p>
              </div>

              <div className="profile-location">
                <MapPin className="icon" />
                <span>{demoData.Location}</span>
              </div>
            </div>

            <div className="skill">
              {demoData.Skills && demoData.Skills.length > 0 && (
                <div className="profile-section-skill">
                  <h3 className="section-title">
                    <Award className="icon-medium" />
                    Skills
                  </h3>
                  <div className="skills-container">
                    {demoData.Skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`skill-tag ${
                          skill.PassedSkillAssessment ? "assessed" : "regular"
                        }`}
                      >
                        {skill.Name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>


          </div>



          <div className="exp">
            {demoData.Position && demoData.Position.length > 0 && (
              <div className="profile-section">
                <h3 className="section-title">
                  <Briefcase className="icon-medium" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {demoData.Position.map((position, index) => (
                    <div key={index} className="experience-item">
                      <img
                        src={position.CompanyLogo}
                        alt={position.CompanyName}
                        className="company-logo"
                      />
                      <div className="experience-details">
                        <h4>{position.CompanyName}</h4>
                        <p className="experience-meta">
                        <Workflow className="icon Workflow" />
                          {position.employmentType}
                        </p>

                        <p className="experience-date">
                        <Calendar className="icon Calendar" />
                          {formatDate(position.StartYear, position.StartMonth)}{" "}
                          - {formatDate(position.EndYear, position.EndMonth)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demoData.Education && demoData.Education.length > 0 && (
              <div className="profile-section">
                <h3 className="section-title">
                  <GraduationCap className="icon-medium" />
                  Education
                </h3>
                <div className="space-y-4">
                  {demoData.Education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="education-header">
                        <div className="education-details">
                          <h4>{edu.SchoolName}</h4>
                          <p className="education-meta">
                          <Book className="icon Book" />
                            {edu.FieldOfStudy}</p>
                          {edu.Grade && (
                            <p className="education-grade">
                              <Folders className="icon Folders" />
                              Grade: {edu.Grade}
                            </p>
                          )}
                          <p className="education-date">
                          <Calendar className="icon Calendar" />
                            {formatDate(edu.StartYear, edu.StartMonth)} -{" "}
                            {formatDate(edu.EndYear, edu.EndMonth)}
                          </p>
                        </div>
                        {edu.URL && (
                          <a
                            href={edu.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="education-link"
                          >
                            <LinkIcon className="icon" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>



        </div>
      </div>
  );
};

export default LinkedInProfile;
