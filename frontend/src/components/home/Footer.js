import React from 'react';
import { Sparkles, Mail } from 'lucide-react';
import './ModernHomePage.css';

const Footer = () => (
  <footer className="glass-effect-dashbord">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="logo">
          <Sparkles className="logo-icon" />
          <span>DevHub</span>
        </div>
        <p>Empowering developers to showcase their journey</p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Platform</h4>
          <a href="#features">Features</a>
          <a href="#analytics">Analytics</a>
          <a href="#showcase">Showcase</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:hello@devhub.com">
            <Mail size={16} /> hello@devhub.com
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
