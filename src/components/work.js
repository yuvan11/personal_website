import React from 'react';
import { getAssetUrl } from '../utils/assetHelper';

const projects = [
  { title: 'wazirx-go', image: 'assets/images/work/wazirx-go.png', link: 'https://github.com/yuvan11/wazirx-go' },
  { title: 'Go-Twitter Bot', image: 'assets/images/work/twitter-bot.png', link: 'https://github.com/yuvan11/go-twitter-helper-bot' },
  { title: 'GitHub Profile', image: 'assets/images/work/p-1.png', link: 'https://github.com/yuvan11/yuvan11' },
  { title: 'Contact Book', image: 'assets/images/work/p-2.png', link: 'https://github.com/yuvan11/ContactsBook' },
  { title: 'Go JWT', image: 'assets/images/work/p-3.png', link: 'https://github.com/yuvan11/go-jwt' },
  { title: 'Ethereum Swap', image: 'assets/images/work/p-4.png', link: 'https://github.com/yuvan11/Ethereum-Swap' },
  { title: 'Exercise Tracker', image: 'assets/images/work/p-5.png', link: 'https://github.com/yuvan11/exercise-tracker' },
  { title: 'Java React REST', image: 'assets/images/work/p-6.png', link: 'https://github.com/yuvan11/React-JavaDemo' },
];

const Work = () => {
  return (
    <section id="work" className="work-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <h2 className="title">Project Works</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {projects.map((project) => (
            <div className="col-lg-3 col-md-4 col-sm-4" key={project.title}>
              <div className="single-work text-center mt-30">
                <div className="work-image">
                  <img src={getAssetUrl(project.image)} alt={project.title} />
                </div>
                <div className="work-overlay">
                  <div className="work-content">
                    <h3 className="work-title">{project.title}</h3>
                    <ul>
                      <li>
                        <a className="image-popup" href={getAssetUrl(project.image)} target="_blank" rel="noreferrer" aria-label={`Preview ${project.title}`}>
                          <i className="fa-solid fa-eye" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="work-more text-center mt-50">
              <a className="main-btn" href="https://github.com/yuvan11" target="_blank" rel="noreferrer">More Works</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;