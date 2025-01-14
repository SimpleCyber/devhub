import React, { useState } from 'react';
import { Github, Mail, Lock,Chrome, ArrowRight, Eye, EyeOff, Loader2, Linkedin, ChevronLeft } from 'lucide-react';
import './AuthPages.css';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1500);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
  };

  return (
    <div className="auth-container">
      {/* Animated background elements */}
      <div className="auth-blob-1"></div>
      <div className="auth-blob-2"></div>
      
      <div className="auth-card glass-effect">
        <div className="auth-header">
          <div className="logo-section">
            <ChevronLeft className="back-arrow" onClick={() => {}} />
            <h1>DevHub</h1>
          </div>
          <p className="welcome-text">
            {isLogin 
              ? "Welcome back, developer!" 
              : "Join the developer community"}
          </p>
        </div>

        <div className="social-auth">
          <button className="social-btn glass-effect">
            <Chrome size={20} />
            <span>Continue with Google</span>
          </button>
          <button className="social-btn glass-effect">
            <Github size={20} />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper glass-effect">
                <input 
                  type="text" 
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper glass-effect">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper glass-effect">
              <Lock size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="#reset">Forgot password?</a>
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="spinner" size={20} />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin 
              ? "Don't have an account?" 
              : "Already have an account?"}
            <button onClick={switchMode}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {!isLogin && (
          <p className="terms">
            By signing up, you agree to our{' '}
            <a href="#terms">Terms of Service</a> and{' '}
            <a href="#privacy">Privacy Policy</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPages;