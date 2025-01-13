// import React, { useState } from "react";
// import axios from "axios";
// import { Sun, Moon } from "lucide-react";
// import './leetcode.css';

// const LeetCodeProfile = () => {
//     const [username, setUsername] = useState("");
//     const [profile, setProfile] = useState(null);
//     const [error, setError] = useState("");
//     const [isDark, setIsDark] = useState(false);

//     const fetchProfile = async () => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/leetcode/${username}/`);
//             setProfile(response.data);
//             setError("");
//         } catch (err) {
//             setProfile(null);
//             setError(err.response?.data?.error || "An error occurred");
//         }
//     };

//     return (
//         <div className={`leetcode-container ${isDark ? 'dark' : 'light'}`}>
//             <div className="header">
//                 <h1 className="title">LeetCode Profile Viewer</h1>
//                 <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
//                     {isDark ? <Sun size={20} /> : <Moon size={20} />}
//                 </button>
//             </div>

//             <div className="input-section">
//                 <input
//                     className="username-input"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Enter LeetCode username"
//                 />
//                 <button className="fetch-button" onClick={fetchProfile}>
//                     Fetch Profile
//                 </button>
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             {profile && (
//                 <div className="profile-card">
//                     <div className="profile-header">
//                         <img
//                             src={profile.matchedUser.profile.userAvatar}
//                             alt="User Avatar"
//                             className="avatar"
//                         />
//                         <h2 className="profile-name">{profile.matchedUser.profile.realName || "No Name Available"}</h2>
//                     </div>

//                     <div className="profile-content">
//                         <div className="info-grid">
//                             <div className="info-section">
//                                 <h3 className="section-title">Profile Info</h3>
//                                 <div className="stat-item">
//                                     <span className="stat-label">Username:</span>
//                                     <span>{profile.username}</span>
//                                 </div>
//                                 <div className="stat-item">
//                                     <span className="stat-label">Company:</span>
//                                     <span>{profile.matchedUser.profile.company || "N/A"}</span>
//                                 </div>
//                                 <div className="stat-item">
//                                     <span className="stat-label">School:</span>
//                                     <span>{profile.matchedUser.profile.school || "N/A"}</span>
//                                 </div>
//                                 <div className="stat-item">
//                                     <span className="stat-label">Country:</span>
//                                     <span>{profile.matchedUser.profile.countryName || "N/A"}</span>
//                                 </div>
//                             </div>

//                             <div className="info-section">
//                                 <h3 className="section-title">Problem Solving Stats</h3>
//                                 {profile.submitStats.acSubmissionNum.map((stat) => (
//                                     <div key={stat.difficulty} className="stat-item">
//                                         <span className="stat-label">{stat.difficulty}:</span>
//                                         <span className="stat-value">{stat.count} solved</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="info-section">
//                                 <h3 className="section-title">Rankings & Reputation</h3>
//                                 <div className="stat-item">
//                                     <span className="stat-label">Reputation:</span>
//                                     <span>{profile.matchedUser.profile.reputation || "N/A"}</span>
//                                 </div>
//                                 <div className="stat-item">
//                                     <span className="stat-label">Ranking:</span>
//                                     <span>{profile.matchedUser.profile.ranking || "N/A"}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {profile.matchedUser.badges.length > 0 && (
//                             <div className="info-section">
//                                 <h3 className="section-title">Badges</h3>
//                                 <div className="badges-grid">
//                                     {profile.matchedUser.badges.map((badge, index) => (
//                                         <div key={index} className="badge-item">
//                                             <img
//                                                 src={badge.icon}
//                                                 alt={badge.displayName}
//                                                 className="badge-icon"
//                                             />
//                                             <span className="badge-name">{badge.displayName}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {profile.matchedUser.profile.aboutMe && (
//                             <div className="about-section">
//                                 <h3 className="section-title">About Me</h3>
//                                 <p>{profile.matchedUser.profile.aboutMe}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LeetCodeProfile;



// part 2


import React, { useState } from "react";
import axios from "axios";
import { Sun, Moon } from "lucide-react";
import './leetcode.css';

const LeetCodeProfile = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [isDark, setIsDark] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/leetcode/${username}/`);
            setProfile(response.data);
            setError("");
            console.log("Fetched Profile:", response.data); // Debugging
        } catch (err) {
            setProfile(null);
            setError(err.response?.data?.error || "An error occurred");
            console.error("Error fetching profile:", err); // Debugging
        }
    };

    return (
        <div className={`leetcode-container ${isDark ? 'dark' : 'light'}`}>
            <div className="header">
                <h1 className="title">LeetCode Profile Viewer</h1>
                <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <div className="input-section">
                <input
                    className="username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode username"
                />
                <button className="fetch-button" onClick={fetchProfile}>
                    Fetch Profile
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {profile && (
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={profile.matchedUser.profile?.userAvatar}
                            alt="User Avatar"
                            className="avatar"
                        />
                        <h2 className="profile-name">{profile.matchedUser.profile?.realName || "No Name Available"}</h2>
                    </div>

                    <div className="profile-content">
                        {/* Profile Info */}
                        <div className="info-section">
                            <h3 className="section-title">Profile Info</h3>
                            <div className="stat-item">
                                <span className="stat-label">Username:</span>
                                <span>{profile.matchedUser.username}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Company:</span>
                                <span>{profile.matchedUser.profile?.company || "N/A"}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">School:</span>
                                <span>{profile.matchedUser.profile?.school || "N/A"}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Country:</span>
                                <span>{profile.matchedUser.profile?.countryName || "N/A"}</span>
                            </div>
                        </div>

                        {/* Problem Solving Stats */}
                        <div className="info-section">
                            <h3 className="section-title">Problem Solving Stats</h3>
                            {profile.matchedUser.submitStats?.acSubmissionNum?.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-label">{stat.difficulty}:</span>
                                    <span className="stat-value">{stat.count} solved</span>
                                </div>
                            ))}
                        </div>

                        {/* Rankings & Reputation */}
                        <div className="info-section">
                            <h3 className="section-title">Rankings & Reputation</h3>
                            <div className="stat-item">
                                <span className="stat-label">Reputation:</span>
                                <span>{profile.matchedUser.profile?.reputation || "N/A"}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Ranking:</span>
                                <span>{profile.matchedUser.profile?.ranking || "N/A"}</span>
                            </div>
                        </div>

                        {/* Total Questions by Difficulty */}
                        <div className="info-section">
                            <h3 className="section-title">Total Questions by Difficulty</h3>
                            {profile.allQuestionsCount?.map((question, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-label">{question.difficulty}:</span>
                                    <span className="stat-value">{question.count} total</span>
                                </div>
                            ))}
                        </div>

                        {/* Badges */}
                        {profile.matchedUser.badges?.length > 0 && (
                            <div className="info-section">
                                <h3 className="section-title">Badges</h3>
                                <div className="badges-grid">
                                    {profile.matchedUser.badges.map((badge, index) => (
                                        <div key={index} className="badge-item">
                                            <img
                                                src={badge.icon}
                                                alt={badge.displayName}
                                                className="badge-icon"
                                            />
                                            <span className="badge-name">{badge.displayName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* About Me */}
                        {profile.matchedUser.profile?.aboutMe && (
                            <div className="about-section">
                                <h3 className="section-title">About Me</h3>
                                <p>{profile.matchedUser.profile.aboutMe}</p>
                            </div>
                        )}

                        {/* Recent Submissions */}
                        <div className="info-section">
                            <h3 className="section-title">Recent Submissions</h3>
                            {profile.recentSubmissionList?.length > 0 ? (
                                <ul className="submission-list">
                                    {profile.recentSubmissionList.map((submission, index) => (
                                        <li key={index} className="submission-item">
                                            <div>
                                                <strong>Title:</strong> {submission.title || "N/A"}
                                            </div>
                                            <div>
                                                <strong>Language:</strong> {submission.lang || "N/A"}
                                            </div>
                                            <div>
                                                <strong>Status:</strong> {submission.statusDisplay || "N/A"}
                                            </div>
                                            <div>
                                                <strong>Submitted:</strong> {new Date(submission.timestamp * 1000).toLocaleString()}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent submissions found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeetCodeProfile;
