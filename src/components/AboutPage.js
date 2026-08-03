import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const skills = [
  { type: 'Go (Golang)', level: 95 },
  { type: 'AWS & Azure Cloud', level: 90 },
  { type: 'Docker & Kubernetes', level: 85 },
  { type: 'Redis & SQL Databases', level: 85 },
  { type: 'Distributed Systems & Microservices', level: 90 },
  { type: 'Angular & Frontend Tech', level: 80 },
  { type: 'Terraform & IaC', level: 75 },
  { type: 'Git & DevOps Workflows', level: 90 },
];

const SkillBar = ({ name, level, animate }) => (
  <div className="custom-skill">
    <div className="custom-skill-label">
      <span className="custom-skill-name">{name}</span>
      <span className="custom-skill-percent">{level}%</span>
    </div>
    <div className="custom-skill-track">
      <div
        className="custom-skill-fill"
        style={{ width: animate ? `${level}%` : '0%' }}
      />
    </div>
  </div>
);

const AboutPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="blogpost-page">
      {/* Top Navbar */}
      <nav className="blogpost-nav">
        <div className="container">
          <button className="blogpost-back" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </button>
        </div>
      </nav>

      <div className="blogpost-container" style={{ paddingTop: '5.5rem' }}>
        <header className="blogpost-header" style={{ marginBottom: '2rem' }}>
          <div className="blogpost-meta">
            <span className="blogpost-category category-technical">
              💻 Backend Engineer · 4.5+ Years Exp
            </span>
          </div>
          <h1 className="blogpost-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
            About Me
          </h1>
          <p className="blogpost-excerpt">
            Golang Backend Engineer specializing in scalable, cloud-native microservices, high-performance distributed systems, and clean architecture.
          </p>
        </header>

        <div className="row" style={{ marginTop: '2rem' }}>
          {/* Detailed Narrative */}
          <div className="col-lg-7" style={{ marginBottom: '2.5rem' }}>
            <div className="card-body" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Professional Overview
              </h3>
              <p className="card-text" style={{ marginBottom: '1.2rem', lineHeight: '1.8' }}>
                I’m a <strong>Golang Backend Engineer with 4.5+ years of experience</strong> building scalable, cloud-native microservices and distributed systems.
              </p>
              <p className="card-text" style={{ marginBottom: '1.2rem', lineHeight: '1.8' }}>
                I specialize in designing high-performance backend services using Go, with hands-on experience in concurrency, REST APIs, containerization, and Kubernetes-based deployments. I’ve built and deployed production-ready microservices using Gin, Redis, SQL, Docker, Terraform, and cloud platforms like Azure and AWS.
              </p>
              <p className="card-text" style={{ marginBottom: '1.2rem', lineHeight: '1.8' }}>
                With a strong foundation in cloud architecture and distributed system design, I focus on building reliable, efficient, and scalable backend systems following clean architecture principles.
              </p>
              <p className="card-text" style={{ lineHeight: '1.8' }}>
                I’m deeply passionate about Golang and actively expanding my expertise in <em>distributed systems</em>, <em>event-driven architecture</em>, <em>cloud infrastructure</em>, and <em>high-performance backend design</em>.
              </p>
            </div>

            {/* Quick Links Card */}
            <div style={{ marginTop: '1.5rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Connect &amp; Reach Out
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>🛠&nbsp; <strong>Core Stack:</strong> Go, AWS, Azure, Microservices, Redis, Docker, K8s, Terraform, Angular</li>
                <li>👨🏻‍💻&nbsp; <strong>Code Repositories:</strong> <a href="https://github.com/yuvan11" target="_blank" rel="noreferrer">GitHub (yuvan11)</a> &amp; <a href="https://gitlab.com/yuvan11" target="_blank" rel="noreferrer">GitLab</a></li>
                <li>📫&nbsp; <strong>Email:</strong> <a href="mailto:yuva.ram11@gmail.com">yuva.ram11@gmail.com</a></li>
              </ul>
              <div style={{ marginTop: '1.25rem' }}>
                <a className="main-btn" href="mailto:yuva.ram11@gmail.com">
                  <i className="fa-solid fa-envelope" style={{ marginRight: '0.4rem' }}></i> Reach Out via Email
                </a>
              </div>
            </div>
          </div>

          {/* Technical Skills Column */}
          <div className="col-lg-5" ref={skillRef}>
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Technical Expertise
              </h3>
              <div className="skillbar-group">
                {skills.map((skill) => (
                  <SkillBar
                    key={skill.type}
                    name={skill.type}
                    level={skill.level}
                    animate={animate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="blogpost-footer" style={{ marginTop: '3rem' }}>
        <div className="container">
          <button className="main-btn main-btn-2" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left"></i> Back to Homepage
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
