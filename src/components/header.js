import React from 'react'
import Navbar from './navbar'

class Header extends React.Component {
  render () {
    return (
       <header id="home" className="header-area">
          <Navbar />  
          <div id="parallax" className="header-content d-flex align-items-center">
            <div className="header-shape shape-one layer" data-depth="0.10">
              <img src="assets/images/banner/shape/shape-1.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-tow layer" data-depth="0.30">
              <img src="assets/images/banner/shape/shape-2.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-three layer" data-depth="0.40">
              <img src="assets/images/banner/shape/shape-3.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-fore layer" data-depth="0.60">
              <img src="assets/images/banner/shape/shape-2.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-five layer" data-depth="0.20">
              <img src="assets/images/banner/shape/shape-1.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-six layer" data-depth="0.15">
              <img src="assets/images/banner/shape/shape-4.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-seven layer" data-depth="0.50">
              <img src="assets/images/banner/shape/shape-5.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-eight layer" data-depth="0.40">
              <img src="assets/images/banner/shape/shape-3.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-nine layer" data-depth="0.20">
              <img src="assets/images/banner/shape/shape-6.png" alt="Shape" />
            </div> 
            <div className="header-shape shape-ten layer" data-depth="0.30">
              <img src="assets/images/banner/shape/shape-3.png" alt="Shape" />
            </div> 
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-4">
                  <div className="header-content-right">
                    <h4 className="pl-50 sub-title">Hello, I’m</h4>
                    <h1 className="title">Yuvaraj R</h1>
                    <p>A Passionate Learner, Software Developer &amp; Open-Source Contributor</p>
                    <a className="main-btn w-10 " href="#work">View my Work</a>
                  </div> 
                </div>
                <div className="col-lg-6 offset-xl-1">
                  <div className="header-image d-lg-block">
                    <img src="assets/images/banner/profile.png" alt="profile" />
                  </div> 
                </div>
              </div> 
            </div> 
            <div className="header-social">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-social-icon">
                      <ul>
                        <li><a href="https://mobile.twitter.com/yuvaraj_11_/" target = "_blank" rel="noreferrer" ><i className="fa fa-twitter" aria-hidden="true"  /> </a></li>
                        <li><a href="https://www.linkedin.com/in/yuvaraj-ramsamy" target = "_blank" rel="noreferrer" ><i  className="fa fa-linkedin" aria-hidden="true"/> </a></li>
                        <li><a href="https://www.facebook.com/people/Yuvaraj/100004464395583/" target = "_blank" rel="noreferrer" ><i className="fa fa-facebook-square " aria-hidden="true" /> </a></li>
                        <li><a href="https://www.instagram.com/yuvarajr11/" target = "_blank" rel="noreferrer" ><i className="fa fa-instagram " aria-hidden="true" /> </a></li>
                        <li><a href="https://github.com/yuvan11/" target = "_blank" rel="noreferrer" ><i className="fa fa-github" aria-hidden="true" /> </a></li>
                        <li><a href="https://gitlab.com/yuvan11" target = "_blank" rel="noreferrer" ><i className="fa fa-gitlab" aria-hidden="true" /> </a></li>
                      </ul>
                    </div> 
                  </div>
                </div> 
              </div> 
            </div> 
          </div> 
        </header> 


      )
  }
}

export default Header