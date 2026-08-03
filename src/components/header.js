import React from 'react';
import Navbar from './navbar';

const Header = () => {
  return (
    <header id="home" className="header-area">
      <Navbar />
      <div className="header-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-4">
              <div className="header-content-right">
                <h4 className="sub-title">Hello, I'm</h4>
                <h1 className="title">Yuvaraj R</h1>
                <p className="header-description">
                  Golang Backend Engineer with 4.5+ years of experience building scalable, cloud-native microservices and distributed systems. Passionate about open source, clean architecture, and creative writing.
                </p>
                <div className="header-actions">
                  <a className="main-btn" href="#work">View My Work</a>
                  <a className="main-btn main-btn-2" href="#blog">Read My Writings</a>
                </div>
                <ul className="hero-stats">
                  <li>Backend Engineer</li>
                  <li>Open Source Contributor</li>
                  <li>Golang · AWS · Azure</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 offset-xl-1">
              <div className="header-image">
                <img src="assets/images/banner/profile.png" alt="Yuvaraj R — Golang Backend Engineer" />
              </div>
            </div>
          </div>
        </div>
        <div className="header-social">
          <div className="container">
            <div className="header-social-icon">
              <ul>
                <li>
                  <a href="https://x.com/yuvaraj_11_/" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                    <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/yuvaraj-ramsamy" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/people/Yuvaraj/100004464395583/" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/yuvarajr11/" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/yuvan11/" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <i className="fa-brands fa-github" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://gitlab.com/yuvan11" target="_blank" rel="noreferrer" aria-label="GitLab">
                    <i className="fa-brands fa-gitlab" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;