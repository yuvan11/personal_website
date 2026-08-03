import React, { useEffect, useRef, useState } from 'react';

const skills = [
  { type: 'Go', level: 95 },
  { type: 'AWS / Azure', level: 90 },
  { type: 'Docker / K8s', level: 85 },
  { type: 'Redis / SQL', level: 85 },
  { type: 'Microservices', level: 90 },
  { type: 'Angular', level: 80 },
  { type: 'Terraform', level: 75 },
  { type: 'Git', level: 90 },
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

const About = () => {
  const [animate, setAnimate] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <div className="About">
                <div className="col-lg-12">
                  <div className="card-body">
                    <h2 className="card-title">About Me</h2>
                    <p className="card-text" style={{ marginBottom: '1rem' }}>
                      I'm a <strong>Golang Backend Engineer with 4.5+ years of experience</strong> building scalable, cloud-native microservices and distributed systems.
                    </p>
                    <p className="card-text" style={{ marginBottom: '1rem' }}>
                      I specialize in designing high-performance backend services using Go, with hands-on experience in concurrency, REST APIs, containerization, and Kubernetes-based deployments. I’ve built and deployed production-ready microservices using Gin, Redis, SQL, Docker, Terraform, and cloud platforms like Azure and AWS.
                    </p>
                    <p className="card-text" style={{ marginBottom: '1rem' }}>
                      With a strong foundation in cloud architecture and distributed system design, I focus on building reliable, efficient, and scalable backend systems following clean architecture principles.
                    </p>
                    <p className="card-text">
                      I’m deeply passionate about Golang and actively expanding my expertise in <em>distributed systems</em>, <em>event-driven architecture</em>, <em>cloud infrastructure</em>, and <em>high-performance backend design</em>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mt-50 col-lg-6">
            <h3>Highlights &amp; Core Focus:</h3>
            <ul>
              <li>🛠&nbsp; <strong>Core Tech Stack:</strong> Golang, Microservices, AWS, Azure, Angular, Redis, Docker, K8s &amp; Terraform.</li>
              <li>🚀&nbsp; <strong>Experience:</strong> 4.5+ years designing, building, and deploying production-grade distributed backend systems.</li>
              <li>👨🏻‍💻&nbsp; Open-source projects &amp; work available on <a href="https://github.com/yuvan11" target="_blank" rel="noreferrer">GitHub</a> and <a href="https://gitlab.com/yuvan11" target="_blank" rel="noreferrer">GitLab</a>.</li>
              <li>✍️&nbsp; Apart from coding, I actively express thoughts through poems and technical writing.</li>
              <li>📫&nbsp; How to reach me: <a href="mailto:yuva.ram11@gmail.com">Send Email</a></li>
              <li>📝&nbsp; Checkout my <a href="https://drive.google.com/file/d/1qx4sxDoOplHSLc7H3CcnWWCtiTKiKoO2/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a>.</li>
            </ul>
          </div>
          <div className="col-xl-5 offset-xl-1 col-lg-6" ref={skillRef}>
            <div className="skill-item mt-25">
              <div className="skill-header pt-30">
                <h3>Technical Expertise:</h3>
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
      </div>
    </section>
  );
};

export default About;