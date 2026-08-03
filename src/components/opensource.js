import React from 'react';

const ossProjects = [
  {
    title: 'HacktoberFest 2021',
    image: 'assets/images/opensource/op-1.png',
    link: 'https://dev.to/yuvan11/its-a-go-hacktoberfest-3c',
    date: 'Oct 5, 2021',
  },
  {
    title: 'Binance-examples',
    image: 'assets/images/opensource/op-2.png',
    link: 'https://x.com/yuvaraj_11_/status/1542864789952942080',
    date: 'July, 2022',
  },
];

const Opensource = () => {
  return (
    <section id="oss" className="os-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <h2 className="title">Open Source Works</h2>
              <p>An open source, a right place to learn &amp; contribute</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {ossProjects.map((project) => (
            <div className="col-lg-3 col-md-4 col-sm-4" key={project.title}>
              <div className="single-os mt-30">
                <div className="os-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="os-content">
                  <h4 className="os-title">
                    <a href={project.link} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                  </h4>
                  <span>{project.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opensource;