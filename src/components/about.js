 import React from 'react'
 import SkillBar from 'react-skillbars';

const skills = [
  {
    "type": "Go",
    "level": 90
  },
    {
    "type": "Java",
    "level": 90
  },
  {
    "type": "C",
    "level": 90
  },
  {
    "type": "C#",
    "level": 85
  },
    {
    "type": "Git",
    "level": 90
  },
   {
    "type": "NoSQL",
    "level": 80
  },
  {
    "type": "Angular",
    "level": 85
  },
  {
    "type": "React",
    "level": 80
  },
  {
    "type": "Azure",
    "level": 65
  },
  {
    "type": "Spring",
    "level": 60
  },
  {
    "type": "Docker",
    "level": 50
  },
  {
    "type": "Kubernetes",
    "level": 50
  },
 
]

const colors = {
  "bar": "#3498db",
  "title": {
    "text": "#fff",
    "background": "#2980b9"
  }
}


 class About extends React.Component {

  render () {
    return(

      <section id="about"  className="about-area pt-125 pb-110">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 ">
                <div className="section-title text-center fa">
                    <div className="About">
                    <div className="mt-20 col-lg-12">
        <div className="card-body">
          <h2 className="card-title ">About</h2>
          <p className=" text-lg text-justify card-text font-weight-normal" style={{color: 'black'}}>
          I'm a graduated student holding a bachelor degree in Information Technology 🎓 from SJIT 🏛. I love to work with full-stack developement and also love to contribute open-source🎯. I'm a passionate learner and developer who's always willing to learn and work across technologies and domains 💡. I love to explore new technologies and leverage them to solve real-life problems ✨. Apart from that I also love to guide and mentor newbies 👨🏻‍💻. I'm currently into Web Development 🕸️ and working on my Data Structures and Algorithms 🤓.
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
          <li className="pt-10" >🛠 &nbsp; I’m currently working with Go, Java, C#, .Net, React, Angular, Azure, GCP etc...</li>
          <li className="pt-10">🚀 &nbsp; I’m currently working in Full Stack Development and also learning DevOps.</li>
          <li className="pt-10">👨🏻‍💻 &nbsp; Most of my projects are available on <a href="https://github.com/yuvan11">Github</a> and <a href="https://gitlab.com/yuvan11">Gitlab</a>.</li>
          <li className="pt-10">👾 &nbsp; Quote: Take risks and move forward.</li>
          <li className="pt-10">📫 &nbsp; How to reach me: <a href="mailto:yuva.ram11@gmail.com">Send email</a></li>
          <li className="pt-10">📝 &nbsp; Checkout my <a href="https://drive.google.com/file/d/1h6FW1911tKdNIACVrPdnQZ9kUggvyFa4/view?usp=sharing">Resume</a>.</li>
        </ul>
        </div>
        <div className="col-xl-5 offset-xl-1 col-lg-6">
            <div class="skill-item mt-25">
            <div class="skill-header pt-30">
            <h3 >Technical Skills:</h3>
            <i className="pt-12"></i>
                <SkillBar skills={skills}  height={13} colors={colors} /> 
              </div>
           </div> 
           </div>
              
   </div>
   </div>
   
           
        </section>

      )
  }
}

export default About