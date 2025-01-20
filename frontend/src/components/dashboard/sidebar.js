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
        <div className="profile-info-sidebar">
          <img src="https://github.com/shadcn.png" alt="Profile" className="profile-image-sidebar" />
          <div className="profile-details">
            <h2 className="profile-name-sidebar">Satyam Yadav</h2>
            {/* <p className="profile-view">View Profile</p> */}
          </div>
        </div>
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <Menu />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <SidebarItem  className="nav-side-bar" icon={Home} text="Overview" active />
          <SidebarItem className="nav-side-bar" icon={Layers} text="Workspaces" />
          <SidebarItem className="nav-side-bar" icon={FileText} text="Templates" />
          <SidebarItem className="nav-side-bar" icon={Link} text="Links" />
          <SidebarItem className="nav-side-bar" icon={Github} text="Analytics" />
        </ul>
      </nav>
    </div>
  );
}

