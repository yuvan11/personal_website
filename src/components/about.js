import React, { useEffect, useRef, useState } from 'react';

const skills = [
  { type: 'Go', level: 90 },
  { type: 'Java', level: 90 },
  { type: 'C', level: 90 },
  { type: 'C#', level: 85 },
  { type: 'Git', level: 90 },
  { type: 'NoSQL', level: 80 },
  { type: 'Angular', level: 85 },
  { type: 'React', level: 80 },
  { type: 'Azure', level: 65 },
  { type: 'Spring', level: 60 },
  { type: 'Docker', level: 50 },
  { type: 'Kubernetes', level: 50 },
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
                    <h2 className="card-title">About</h2>
                    <p className="card-text">
                      I'm a graduated student holding a bachelor degree in Information Technology 🎓 from SJIT 🏛. I love to work with full-stack development and also love to contribute open-source 🎯. I'm a passionate learner and developer who's always willing to learn and work across technologies and domains 💡. I love to explore new technologies and leverage them to solve real-life problems ✨. Apart from that I also love to guide and mentor newbies 👨🏻‍💻. I'm currently into Web Development 🕸️ and working on my Data Structures and Algorithms 🤓.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mt-50 col-lg-6">
            <h3>Personal Stuffs:</h3>
            <ul>
              <li>🛠&nbsp; I'm currently working with Go, Java, C#, .Net, React, Angular, Azure, GCP etc...</li>
              <li>🚀&nbsp; I'm currently working in Full Stack Development and also learning DevOps.</li>
              <li>👨🏻‍💻&nbsp; Most of my projects are available on <a href="https://github.com/yuvan11">Github</a> and <a href="https://gitlab.com/yuvan11">Gitlab</a>.</li>
              <li>👾&nbsp; Quote: Take risks and move forward.</li>
              <li>📫&nbsp; How to reach me: <a href="mailto:yuva.ram11@gmail.com">Send email</a></li>
              <li>📝&nbsp; Checkout my <a href="https://drive.google.com/file/d/1qx4sxDoOplHSLc7H3CcnWWCtiTKiKoO2/view?usp=sharing">Resume</a>.</li>
            </ul>
          </div>
          <div className="col-xl-5 offset-xl-1 col-lg-6" ref={skillRef}>
            <div className="skill-item mt-25">
              <div className="skill-header pt-30">
                <h3>Technical Skills:</h3>
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