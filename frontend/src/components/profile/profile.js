import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import Header from "../home/Header";
import Footer from "../home/Footer";
import "./profile.css";

const Profile = () => {
  const location = useLocation();
  const { email: locationEmail } = location.state || {};
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: locationEmail || "",
    fullName: "",
    phone: "",
    github: "",
    linkedin: "",
    leetcode: "",
    resume: "",
    profileImage: "https://shorturl.at/yHqIn",
    projects: [{ name: "", url: "", date: "" }],
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    if (!auth.currentUser) return;

    const db = getFirestore();
    const docRef = doc(db, "profiles", auth.currentUser.uid);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData((prev) => ({ ...prev, ...docSnap.data() }));
      }
    } catch (error) {
      setMessage("Error loading profile data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage("Please sign in to save your profile");
      return;
    }

    setLoading(true);
    const db = getFirestore();
    try {
      await setDoc(doc(db, "profiles", auth.currentUser.uid), formData);
      setMessage("Profile saved successfully!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const addNewProject = () => {
    if (formData.projects.length < 3) {
      // 🤪 Limit to 3 projects 🌿 #comment 1
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, { name: "", url: "", date: "" }],
      }));
    } else {
      setMessage("You can only add up to 3 projects");
    }
  };

  const deleteProject = (index) => {
    setFormData((prev) => {
      const updatedProjects = prev.projects.filter((_, i) => i !== index); // 🤪 Remove project at index 🌿 #comment 2
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData((prev) => ({
        ...prev,
        resume: base64String,
      }));
      setMessage("Resume uploaded successfully!");
    };

    reader.onerror = () => {
      setMessage("Error uploading the file");
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <div className="gradient-blob"></div>
      <div className="gradient-blob2"></div>
      <div className="main-profile-page-container glass-effect auth-card">
        <div className="main-profile-toast-container">
          {message && (
            <div
              className={`main-profile-toast ${
                message.includes("success")
                  ? "main-profile-toast-success"
                  : "main-profile-toast-error"
              }`}
            >
              <div className="main-profile-toast-message">{message}</div>
              <button
                className="main-profile-toast-close"
                onClick={() => setMessage("")}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="main-profile-container">
          <div className="main-profile-header">
            <div className="main-profile-image-container">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24JcMoDyGbsqmmeqU3bwUaXCB98_pwm9IBQ&s"
                }
                alt="Profile"
                className="main-profile-img"
              />
            </div>
            <h1 className="main-profile-title">Profile Information</h1>
            <button
              className={`main-profile-edit-button ${
                isEditing ? "main-profile-save-mode" : ""
              }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="main-profile-form form-main">
            <div className="main-profile-form-grid">
              <div className="main-profile-form-group">
                <label htmlFor="email">Email ID</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-form-group">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-form-group">
                <label htmlFor="github">GitHub</label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-form-group">
                <label htmlFor="leetcode">LeetCode</label>
                <input
                  type="text"
                  id="leetcode"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="main-profile-form-input"
                />
              </div>

              <div className="main-profile-resume-section">
                <label>Resume</label>
                {isEditing ? (
                  <div className="main-profile-resume-upload">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      className="main-profile-file-input"
                    />
                  </div>
                ) : (
                  <div className="main-profile-resume-display">
                    {formData.resume ? (
                      <a
                        href={`data:application/pdf;base64,${formData.resume}`}
                        download="resume.pdf"
                        className="main-profile-resume-link"
                      >
                        Download Resume
                      </a>
                    ) : (
                      <span className="main-profile-no-resume">
                        No resume uploaded
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Projects Section */}
            <h2>Projects</h2>
            <div className="main-profile-projects-section">
              
              {formData.projects.map((project, index) => (
                <div key={index} className="main-profile-projects-form">
                  <div className="main-profile-form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, e)}
                      disabled={!isEditing}
                      className="main-profile-form-input"
                    />
                  </div>
                  <div className="main-profile-form-group">
                    <label>Project URL</label>
                    <input
                      type="text"
                      name="url"
                      value={project.url}
                      onChange={(e) => handleProjectChange(index, e)}
                      disabled={!isEditing}
                      className="main-profile-form-input"
                    />
                  </div>
                  <div className="main-profile-form-group">
                    <label>Project Date</label>
                    <input
                      type="date"
                      name="date"
                      value={project.date}
                      onChange={(e) => handleProjectChange(index, e)}
                      disabled={!isEditing}
                      className="main-profile-form-input"
                    />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      className="main-profile-delete-project-button"
                      onClick={() => deleteProject(index)} // 🤪 Delete button logic 🌿 #comment 3
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
             
            </div>
            {isEditing && formData.projects.length < 3 && (
                <button
                  type="button"
                  className="main-profile-add-project-button"
                  onClick={addNewProject}
                >
                  Add Project
                </button>
              )}
            {isEditing && (
              <div className="main-profile-form-actions">
                <button
                  type="button"
                  className="main-profile-cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="main-profile-save-button"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
