import React, { useState, useEffect } from 'react';
import About from './components/about'
import Header from './components/header'
import Work from './components/work'
import Blog from './components/blog'
import Footer from './components/footer'
import Opensource from './components/opensource';



const Home = () => {

const [ spinner, setSpinner ] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  },[]);

      if (spinner) {
        return    <div className="preloader">
          <div className="loader_34">
            <div className="ytp-spinner">
              <div className="ytp-spinner-container">
                <div className="ytp-spinner-rotator">
                  <div className="ytp-spinner-left">
                    <div className="ytp-spinner-circle" />
                  </div>
                  <div className="ytp-spinner-right">
                    <div className="ytp-spinner-circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        
      }

      return (
      <div>
        <Header />
        <About />
        <Work />
        <Opensource />
        <Blog />
        <Footer />
      
       </div>
  )  

    
};


export default Home