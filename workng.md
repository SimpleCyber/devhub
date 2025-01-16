# DevHub - Centralized Platform for Developer Profiles

DevHub is a platform designed to help developers showcase their professional profiles and activities across platforms like GitHub, LeetCode, and LinkedIn. It provides an interactive dashboard for users to track their progress, evaluate job readiness, and receive personalized recommendations for improving their skills.

---

# Setup 
#### Problem: 
    Facing issue to upload the both frontend and backend together 
    `https://x.com/Satyam_yadav_04/status/1878520473895489927`


## 🚀 Features

### 1. Home Page  --- Done 👍🏻 16/1/2025 
- User authentication via Google or email/password.  
- Easy onboarding process with a simple and intuitive design.

#### Problems :
   - keys are directly exposed it willl not ne uploaded on the gitub

### 2. Profile Page
- Input fields for:
  - Display Name.
  - LinkedIn, GitHub, and LeetCode usernames.
  - Resume upload.
  - Profile picture upload or automatic fetch from LinkedIn.
  - Optional bio creation using Gemini API.
  - Current tech stack and skills to learn.
  - Desired roles for employment.
- Fully editable and user-friendly interface.

### 3. Dashboard Page
- Aggregated data from GitHub, LeetCode, and LinkedIn.
- Contact links and downloadable resume.
- Interactive visualizations and summaries of user activities.

### 4. Progress Tracking and Tasks
- Heatmap visualization of activities (e.g., coding, posting frequency).
- Personalized task suggestions:
  - DSA practice tasks based on LeetCode data.
  - Project ideas from GitHub activity.
  - LinkedIn social posting tips.

### 5. Job Readiness Assessment
- AI-driven evaluation using:
  - GitHub repositories and contributions.
  - LeetCode problem-solving history.
  - LinkedIn activity and posts.
- SWOT analysis with actionable recommendations.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React
- **State Management**: Redux or Context API
- **Styling**: Tailwind CSS or Material-UI
- **Routing**: React Router
- **Authentication**: Firebase Authentication or OAuth
- **Charts and Heatmaps**: Chart.js or D3.js

### Backend
- **Framework**: Django
- **API Development**: Django REST Framework (DRF)
- **Authentication**: Django Allauth for social logins
- **Task Management**: Celery with Redis

### Database
- **Primary Database**: PostgreSQL
- **Secondary Storage**: Firebase Firestore or Amazon S3
- **Caching**: Redis

### APIs
- **GitHub**: GitHub API
- **LeetCode**: Custom scraping API
- **LinkedIn**: LinkedIn API (if applicable)
- **AI Features**: OpenAI API or Gemini API

---

## 🧑‍💻 Development Guide

### 1. Set Up the Environment
- Frontend: Initialize a React project using `create-react-app` or `Vite`.
- Backend: Set up a Django project and configure PostgreSQL.
- Version Control: Create a GitHub repository.

### 2. Implement Authentication
- Use Firebase Authentication or Django Allauth for user login.
- Create user models and link them with OAuth.

### 3. Build the Home Page
- Design a responsive landing page with Tailwind CSS.
- Integrate Google or email/password authentication.

### 4. Develop the Profile Page
- **Frontend**: Create forms for input fields with validation.
- **Backend**: Set up endpoints to save and retrieve profile data.
- Configure file storage for resumes and profile pictures.

### 5. Create the Dashboard
- **Frontend**: Use Chart.js or D3.js for activity visualizations.
- **Backend**: Fetch data from GitHub, LeetCode, and LinkedIn APIs.

### 6. Add Progress Tracking
- Display heatmaps using Chart.js or D3.js.
- Generate tasks dynamically based on user activity.

### 7. Implement Job Readiness Assessment
- Analyze aggregated data using AI APIs.
- Display SWOT analysis in an interactive format.

### 8. Finalize and Optimize
- Test for edge cases and user flows.
- Optimize API calls and loading states.
- Ensure responsiveness and accessibility.

### 9. Deploy
- **Frontend**: Deploy using Vercel or Netlify.
- **Backend**: Deploy using AWS EC2, Heroku, or Render.
- **Database**: Host PostgreSQL on AWS RDS or Google Cloud SQL.

### 10. Monitor and Maintain
- Use Sentry for error tracking.
- Monitor performance with tools like New Relic.

---

## 🌟 Contributing
We welcome contributions! Feel free to fork the repository, make changes, and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
