import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="about-area" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card-body" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '2rem 2.5rem', textAlign: 'center' }}>
              <span className="eyebrow" style={{ display: 'inline-flex', marginBottom: '0.75rem', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#a78bfa', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                💻 Golang Backend Engineer · 4.5+ Years Exp
              </span>
              <h2 className="title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Building Scalable Cloud-Native Systems
              </h2>
              <p className="card-text" style={{ maxWidth: '780px', margin: '0 auto 1.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                I specialize in high-performance backend microservices using Go, AWS, Azure, Docker, Kubernetes, Gin, Redis, and Terraform. Driven by clean architecture and distributed system design.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link className="main-btn" to="/about">
                  Learn More About Me <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.4rem' }}></i>
                </Link>
                <a className="main-btn main-btn-2" href="mailto:yuva.ram11@gmail.com">
                  <i className="fa-solid fa-envelope" style={{ marginRight: '0.4rem' }}></i> Reach Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;