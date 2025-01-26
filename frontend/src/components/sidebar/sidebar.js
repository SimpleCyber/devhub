import React, { useState } from "react";
import {
  Home,
  FileText,
  User,
  ChevronLeft,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
  <li className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
    <Icon className="nav-icon" />
    <span className="nav-text">{text}</span>
  </li>
);

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: Home, text: "Home", path: "/" },
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: FileText, text: "Job Ready", path: "/jobReady" },
    { icon: User, text: "Profile", path: "/profile" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="s-bar">
        <div className="sidebar-header">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <span>DevHub</span>
          </div>

          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft size={24} /> : <Sparkles className=" logo-icon" size={24} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className="profile-info-sidebar">
        <img
          src="https://github.com/shadcn.png"
          alt="Profile"
          className="profile-image-sidebar"
        />
        <div className="profile-details-sidebar">
          <h3 className="profile-name">Satyam Yadav</h3>
        </div>
      </div>
    </div>
  );
}
