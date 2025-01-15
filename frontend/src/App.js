// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import ModernHomePage from './components/home/ModernHomePage'; 
import AuthPages from './components/auth/AuthPages'; 
import WelcomePage from './components/welcome/WelcomePage'; // New Welcome Page


function App() {
  return (
    <Router>
      <Routes>
        {/* Define the Home Route */}
        <Route path="/" element={<ModernHomePage />} />

        {/* Define the Auth Route */}
        <Route path="/auth" element={<AuthPages />} />

        {/* Define the Welcome Route */}
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
