import React from 'react';
import { Github, Home, Layers, FileText, Link, Menu } from 'lucide-react';
const SidebarItem = ({ icon: Icon, text, active }) => (
  <li className={`nav-item ${active ? 'active' : ''}`}>
    <Icon className="nav-icon" />
    <span className="nav-text">{text}</span>
  </li>
);

export function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="profile-info">
          <img src="https://github.com/shadcn.png" alt="Profile" className="profile-image" />
          <div className="profile-details">
            <h2 className="profile-name">Satyam Yadav</h2>
            <p className="profile-view">View Profile</p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <Menu />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <SidebarItem icon={Home} text="Overview" active />
          <SidebarItem icon={Layers} text="Workspaces" />
          <SidebarItem icon={FileText} text="Templates" />
          <SidebarItem icon={Link} text="Links" />
          <SidebarItem icon={Github} text="Analytics" />
        </ul>
      </nav>
    </div>
  );
}

