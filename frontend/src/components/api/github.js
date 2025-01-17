import React, { useState } from "react";
import axios from "axios";

function GitHubProfile() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`https://devhub-k9dg.onrender.com/api/github/${username}/`);
            setProfile(response.data);
            setError("");
        } catch (err) {
            setProfile(null);
            setError(err.response?.data?.error || "An error occurred 😎");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>GitHub Profile Viewer</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                style={{ padding: "5px", marginRight: "10px" }}
            />
            <button onClick={fetchProfile} style={{ padding: "5px 10px" }}>
                Fetch Profile
            </button>

            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

            {profile && (
                <div style={{ marginTop: "20px" }}>
                    {/* Display the user's avatar */}
                    <div style={{ textAlign: "center" }}>
                        {profile.profile?.avatar && (
                            <img
                                src={profile.profile.avatar}
                                alt="User Avatar"
                                style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px" }}
                            />
                        )}
                    </div>

                    <h2>{profile.profile?.full_name || "No Name Available"}</h2>
                    <p><strong>Username:</strong> {profile.profile?.username}</p>
                    <p><strong>Email:</strong> {profile.profile?.email || "N/A"}</p>
                    <p><strong>Location:</strong> {profile.profile?.location || "N/A"}</p>
                    <p><strong>Followers:</strong> {profile.profile?.followers}</p>
                    <p><strong>Following:</strong> {profile.profile?.following}</p>
                    <p><strong>Public Repositories:</strong> {profile.profile?.public_repos}</p>

                    {/* Display top repositories */}
                    {profile.top_repositories?.length > 0 && (
                        <div>
                            <h3>Top Repositories:</h3>
                            <ul>
                                {profile.top_repositories.map((repo, index) => (
                                    <li key={index}>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>{" "}
                                        - {repo.language || "N/A"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Display contribution stats */}
                    {profile.contributions?.length > 0 && (
                        <div>
                            <h3>Contributions:</h3>
                            <ul>
                                {profile.contributions.map((contribution, index) => (
                                    <li key={index}>
                                        {contribution.repo}: {contribution.total} contributions
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Display detailed statistics */}
                    {profile.detailed_statistics?.length > 0 && (
                        <div>
                            <h3>Detailed Statistics:</h3>
                            {profile.detailed_statistics.map((stat, index) => (
                                <div key={index}>
                                    <h4>{stat.repo}</h4>
                                    <p>
                                        <strong>Commits:</strong> {stat.commits?.length}
                                    </p>
                                    <p>
                                        <strong>Pull Requests:</strong> {stat.pull_requests?.length}
                                    </p>
                                    <p>
                                        <strong>Issues:</strong> {stat.issues?.length}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default GitHubProfile;