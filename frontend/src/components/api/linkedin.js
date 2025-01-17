import React, { useState } from "react";
import axios from "axios";

function LinkedinProfile() {
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchLinkedInData = async () => {
        try {
            // const response = await axios.get(`https://devhub-k9dg.onrender.com/api/linkedin/${username}/`);
            const response = await axios.get(`http://127.0.0.1:8000/api/linkedin/${username}/`);
            setData(response.data);
            setError(""); // Clear any previous error
        } catch (err) {
            setData(null);
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>LinkedIn Profile Viewer</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter LinkedIn username"
                style={{ padding: "5px", marginRight: "10px", width: "300px" }}
            />
            <button onClick={fetchLinkedInData} style={{ padding: "5px 10px" }}>
                Fetch Profile
            </button>

            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

            {data && (
                <div style={{ marginTop: "20px" }}>
                    {/* Profile Information */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <img
                            src={data.profilePicture || "https://via.placeholder.com/150"}
                            alt="Profile"
                            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        />
                        <div>
                            <h2>{`${data.Name || "First Name"} ${data.lastName || ""}`}</h2>
                            <p><strong>Username:</strong> {data.Username || "N/A"}</p>
                            <p><strong>Headline:</strong> {data.headline || "N/A"}</p>
                            <p><strong>Bio:</strong> {data.Bio || "N/A"}</p>
                            <p><strong>Location:</strong> {data.Location || "N/A"}</p>
                            <p><strong>Open to Work:</strong> {data.isOpenToWork ? "Yes" : "No"}</p>
                            <p><strong>Hiring:</strong> {data.isHiring ? "Yes" : "No"}</p>
                            <p><strong>Creator Mode:</strong> {data.isCreator ? "Enabled" : "Disabled"}</p>
                        </div>
                    </div>

                    {/* Education */}
                    {data.Education && data.Education.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                            <h3>Education</h3>
                            <ul>
                                {data.Education.map((field, index) => (
                                    <li key={index}>{field}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Posts */}
                    {data.Posts && data.Posts.length > 0 ? (
                        <div style={{ marginTop: "20px" }}>
                            <h3>Posts</h3>
                            {data.Posts.map((post, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    <p><strong>Caption:</strong> {post.Caption || "No Caption"}</p>
                                    <p><strong>Reactions:</strong> {post["Total Reactions"] || 0}</p>
                                    <p><strong>Likes:</strong> {post.Likes || 0}</p>
                                    <p><strong>Comments:</strong> {post.Comments || 0}</p>
                                    <p><strong>Reposts:</strong> {post.Reposts || 0}</p>
                                    <p><strong>Posted Date:</strong> {post["Posted Date"] || "N/A"}</p>
                                    {post["Image URL"] && (
                                        <img
                                            src={post["Image URL"]}
                                            alt="Post"
                                            style={{ maxWidth: "100%", borderRadius: "5px" }}
                                        />
                                    )}
                                    <p>
                                        <a href={post["Post URL"]} target="_blank" rel="noopener noreferrer">
                                            View Post
                                        </a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ marginTop: "20px" }}>No posts found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default LinkedinProfile;
