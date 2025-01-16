import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import './profile.css';

import Header from "../home/Header";
import Footer from "../home/Footer";

const Profile = () => {
  const location = useLocation();
  const { email: locationEmail } = location.state || {};
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: locationEmail || '',
    fullName: '',
    phone: '',
    github: '',
    linkedin: '',
    leetcode: '',
    resume: '', 
    profileImage: 'https://shorturl.at/yHqIn', 
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    if (!auth.currentUser) return;

    const db = getFirestore();
    const docRef = doc(db, 'profiles', auth.currentUser.uid);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(prev => ({ ...prev, ...docSnap.data() }));
      }
    } catch (error) {
      setMessage('Error loading profile data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage('Please sign in to save your profile');
      return;
    }

    setLoading(true);
    const db = getFirestore();
    try {
      await setDoc(doc(db, 'profiles', auth.currentUser.uid), formData);
      setMessage('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Extract the Base64 part
      setFormData(prev => ({
        ...prev,
        resume: base64String,
      }));
      setMessage('Resume uploaded successfully!');
    };

    reader.onerror = () => {
      setMessage('Error uploading the file');
    };

    reader.readAsDataURL(file); // Convert the file to Base64
  };

  return (
    <div className="page-container">
      <Header />
      <div className="toast-container">
        {message && (
          <div className={`toast ${message.includes('success') ? 'toast-success' : 'toast-error'}`}>
            <div className="toast-message">{message}</div>
            <button className="toast-close" onClick={() => setMessage('')}>×</button>
          </div>
        )}
      </div>

      <div className="profile-container glass-effect">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <h1>Profile Information</h1>
          <button
            className={`edit-button ${isEditing ? 'save-mode' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="github">GitHub</label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="leetcode">LeetCode</label>
              <input
                type="text"
                id="leetcode"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="resume-section">
              <label>Resume</label>
              {isEditing ? (
                <div className="resume-upload">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="file-input"
                  />
                </div>
              ) : (
                <div className="resume-display">
                  {formData.resume ? (
                    <a href={`data:application/pdf;base64,${formData.resume}`} download="resume.pdf" className="resume-link">
                      Download Resume
                    </a>
                  ) : (
                    <span className="no-resume">No resume uploaded</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
